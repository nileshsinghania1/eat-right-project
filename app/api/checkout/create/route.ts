import { NextResponse } from "next/server";
import crypto from "crypto";
import { checkoutSchema } from "@/lib/validators";
import { calcOffer, inrToPaise } from "@/lib/pricing";
import { razorpayClient } from "@/lib/razorpay";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const input = checkoutSchema.parse(payload);

    const offer = calcOffer(input.qty, input.promoCode);
    if ((input.promoCode ?? "").trim() && !offer.promoApplied) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Server missing DATABASE_URL (DB not configured)" },
        { status: 500 }
      );
    }

    const amountPaise = inrToPaise(offer.subtotalInr);
    const receiptId = `rcpt_${crypto.randomBytes(8).toString("hex")}`;

    // 1) Create DB order first (so every payment has an order record)
    const dbOrder = await prisma.order.create({
      data: {
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
        notes: JSON.stringify({
          promoApplied: offer.promoApplied,
          promoCode: offer.promoCode || "",
          baseSubtotalInr: offer.baseSubtotalInr,
          subtotalInr: offer.subtotalInr,
          savingsInr: offer.savingsInr,
        }),
      },
      select: { id: true },
    });

    // 2) Create Razorpay order
    const razorpay = razorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: receiptId,
      notes: {
        appOrderId: dbOrder.id,
        promoCode: offer.promoCode || "",
        qty: String(offer.qty),
        freeQty: String(offer.free),
        chargeableQty: String(offer.chargeable),
      },
    });

    // 3) Save Razorpay order id back to DB
    await prisma.order.update({
      where: { id: dbOrder.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({ orderId: dbOrder.id, razorpayOrder });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Checkout failed" },
      { status: 400 }
    );
  }
}
