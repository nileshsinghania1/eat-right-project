import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Razorpay signature verification uses HMAC-SHA256 over "order_id|payment_id" :contentReference[oaicite:2]{index=2}
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const ok = expected === razorpay_signature;

    // Optional DB update (only if DATABASE_URL is configured)
    if (process.env.DATABASE_URL) {
      try {
        await prisma.order.update({
          where: { razorpayOrderId: razorpay_order_id },
          data: {
            status: ok ? "PAID" : "FAILED",
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
          },
        });
      } catch {
        // ignore if order isn't stored yet
      }
    }

    if (!ok) return NextResponse.json({ ok: false }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error" }, { status: 400 });
  }
}
