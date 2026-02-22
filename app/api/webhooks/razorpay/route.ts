import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  // Razorpay sends signature in header: X-Razorpay-Signature
  const signature = req.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: true }); // allow if not configured

  const body = await req.text();
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

  if (!signature || expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  // Example events: payment.captured, payment.failed, order.paid etc.
  // Try to map to your internal orderId via notes or receipt.
  const notesOrderId = event?.payload?.payment?.entity?.notes?.orderId;

  if (notesOrderId) {
    const ev = event.event as string;
    if (ev === "payment.failed") {
      await prisma.order.update({ where: { id: notesOrderId }, data: { status: "FAILED", notes: "payment.failed webhook" } });
    }
    if (ev === "payment.captured") {
      await prisma.order.update({ where: { id: notesOrderId }, data: { status: "PAID", notes: "payment.captured webhook" } });
    }
  }

  return NextResponse.json({ ok: true });
}
