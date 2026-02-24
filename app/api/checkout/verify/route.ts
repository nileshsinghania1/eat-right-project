import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const razorpay_order_id = data?.razorpay_order_id;
    const razorpay_payment_id = data?.razorpay_payment_id;
    const razorpay_signature = data?.razorpay_signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing Razorpay fields from client callback" },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured: missing RAZORPAY_KEY_SECRET" },
        { status: 500 }
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const ok = expected === razorpay_signature;

    // Optional DB update only when DATABASE_URL exists
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
        // ignore if order not stored yet
      }
    }

    if (!ok) return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error" }, { status: 400 });
  }
}
