import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendAdminEmail, sendCustomerEmail } from "@/lib/notify";

function verifySignature(rawBody: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature) {
      return NextResponse.json({ error: "Missing X-Razorpay-Signature" }, { status: 400 });
    }
    if (!secret) {
      return NextResponse.json({ error: "Missing RAZORPAY_WEBHOOK_SECRET" }, { status: 500 });
    }

    // IMPORTANT: use raw body for signature verification
    const rawBody = await req.text();

    const ok = verifySignature(rawBody, signature, secret);
    if (!ok) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Common events you’ll likely enable:
    // - payment.captured (payment successful) :contentReference[oaicite:1]{index=1}
    // - order.paid (order marked paid) :contentReference[oaicite:2]{index=2}
    const eventName: string = event?.event;

    // Extract entities (Razorpay payloads include a "payload" object)
    const paymentEntity = event?.payload?.payment?.entity;
    const orderEntity = event?.payload?.order?.entity;

    const razorpayPaymentId: string | undefined = paymentEntity?.id;
    const razorpayOrderId: string | undefined =
      paymentEntity?.order_id || orderEntity?.id;

    if (!razorpayOrderId) {
      // Signature is valid but payload doesn’t have order_id — acknowledge to avoid retries
      return NextResponse.json({ ok: true, note: "No order_id in payload" });
    }

    if (eventName === "payment.captured" || eventName === "order.paid") {
      // Idempotent: only transition CREATED -> PAID once
      const updated = await prisma.order.updateMany({
        where: { razorpayOrderId, status: "CREATED" },
        data: {
          status: "PAID",
          razorpayPaymentId: razorpayPaymentId ?? undefined,
        },
      });

      // Send notifications once
      if (updated.count === 1) {
        const order = await prisma.order.findFirst({ where: { razorpayOrderId } });
        if (order) {
          await Promise.allSettled([
            sendAdminEmail(order as any),
            sendCustomerEmail(order as any),
          ]);
        }
      }
    }

    if (eventName === "payment.failed") {
      await prisma.order.updateMany({
        where: { razorpayOrderId, status: "CREATED" },
        data: { status: "FAILED" },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Webhook error" }, { status: 400 });
  }
}
