import { NextResponse } from "next/server";
import crypto from "crypto";
import { checkoutSchema } from "@/lib/validators";
import { calcOffer, inrToPaise } from "@/lib/pricing";
import { razorpayClient } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const input = checkoutSchema.parse(payload);

    // Promo-aware pricing
    const offer = calcOffer(input.qty, input.promoCode);

    // If code was entered but invalid, reject
    if ((input.promoCode ?? "").trim() && !offer.promoApplied) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 400 });
    }

    const amountPaise = inrToPaise(offer.subtotalInr);
    const receiptId = `rcpt_${crypto.randomBytes(8).toString("hex")}`;

    const razorpay = razorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: receiptId,
      notes: {
        promoCode: offer.promoCode || "",
        qty: String(offer.qty),
        freeQty: String(offer.free),
        chargeableQty: String(offer.chargeable),
      },
    });

    // No DB for now: use receiptId as internal orderId
    return NextResponse.json({ orderId: receiptId, razorpayOrder });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Checkout failed" },
      { status: 400 }
    );
  }
}
