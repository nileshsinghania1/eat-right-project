import { NextResponse } from "next/server";
import crypto from "crypto";
import { checkoutSchema } from "@/lib/validators";
import { calcOffer, inrToPaise } from "@/lib/pricing";
import { prisma } from "@/lib/db";
import { razorpayClient } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const input = checkoutSchema.parse(payload);

    const offer = calcOffer(input.qty, input.promoCode);
if ((input.promoCode ?? "").trim() && !offer.promoApplied) {
  return NextResponse.json({ error: "Invalid promo code" }, { status: 400 });
}
    const amountPaise = inrToPaise(offer.subtotalInr);

    // Receipt id for reconciliation
    const receiptId = `rcpt_${crypto.randomBytes(8).toString("hex")}`;

    // Create DB order first (CREATED)
    const order = await prisma.order.create({
      data: {
        notes: JSON.stringify({
  promoCode: offer.promoCode,
  promoApplied: offer.promoApplied,
  baseSubtotalInr: offer.baseSubtotalInr,
  savingsInr: offer.savingsInr,
}),
        receiptId,
        fullName: input.fullName,
        phone: input.phone,
        email: input.email || null,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2 || null,
        city: input.city,
        state: input.state,
        pincode: input.pincode,
        qty: offer.qty,
        freeQty: offer.free,
        chargeableQty: offer.chargeable,
        amountPaise,
      },
      select: { id: true, receiptId: true },
    });

    // Create Razorpay order
    const razorpay = razorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: order.receiptId!,
      nnotes: {
  orderId: order.id,
  promoCode: offer.promoCode || "",
  qty: String(offer.qty),
  freeQty: String(offer.free),
},
    });

    // Store razorpay order id
    await prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({ orderId: order.id, razorpayOrder });
  } catch (err: any) {
    const msg = err?.message ?? "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
