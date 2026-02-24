import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const razorpay_order_id = data?.razorpay_order_id;
    const razorpay_payment_id = data?.razorpay_payment_id;
    const razorpay_signature = data?.razorpay_signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing Razorpay fields from callback" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server missing RAZORPAY_KEY_SECRET" },
        { status: 500 }
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error" }, { status: 400 });
  }
}
