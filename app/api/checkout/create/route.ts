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

    const offer = calcOffer(input.qty);
    const amountPaise = inrToPaise(offer.subtotalInr);

    // Receipt id for reconciliation
    const receiptId = `rcpt_${crypto.randomBytes(8).toString("hex")}`;

    // Create DB order first (CREATED)
    const order = await prisma.order.create({
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
      },
      select: { id: true, receiptId: true },
    });

    // Create Razorpay order
    const razorpay = razorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: order.receiptId!,
      notes: {
        orderId: order.id,
        offer: "BUY2GET1",
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
