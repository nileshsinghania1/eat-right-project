import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendAdminEmail, sendCustomerEmail } from "@/lib/notify";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const razorpay_order_id = data?.razorpay_order_id;
    const razorpay_payment_id = data?.razorpay_payment_id;
    const razorpay_signature = data?.razorpay_signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing Razorpay fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Missing RAZORPAY_KEY_SECRET" }, { status: 500 });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
    }

    // mark PAID only once (idempotent)
    const updated = await prisma.order.updateMany({
      where: { razorpayOrderId: razorpay_order_id, status: "CREATED" },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // send notifications only on first transition
    if (updated.count === 1) {
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId: razorpay_order_id },
      });

      if (order) {
        await Promise.allSettled([sendAdminEmail(order), sendCustomerEmail(order)]);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error" }, { status: 400 });
  }
}
