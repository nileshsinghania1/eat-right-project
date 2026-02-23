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

    // ✅ Promo-aware pricing
    const offer = calcOffer(input.qty, input.promoCode);

    // If user typed something but it's not a valid promo, reject.
    if ((input.promoCode ?? "").trim() && !offer.promoApplied) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 400 });
    }

    const amountPaise = inrToPaise(offer.subtotalInr); // Razorpay amount must be in subunits (paise). :contentReference[oaicite:0]{index=0}
    const receiptId = `rcpt_${crypto.randomBytes(8).toString("hex")}`;

    // ✅ Create Razorpay order (prevents tampering with amount). :contentReference[oaicite:1]{index=1}
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

    // Optional DB save (works only after DATABASE_URL is set on Vercel)
    // We still return a valid Razorpay order even if DB is not configured yet.
    let orderId = receiptId;

    if (process.env.DATABASE_URL) {
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

          razorpayOrderId: razorpayOrder.id,
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

      orderId = dbOrder.id;
    }

    return NextResponse.json({ orderId, razorpayOrder });
  } catch (err: any) {
    const msg = err?.message ?? "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
