// lib/notify.ts
type OrderRow = {
  id: string;
  createdAt: Date;
  fullName: string;
  phone: string;
  email: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  qty: number;
  freeQty: number;
  chargeableQty: number;
  amountPaise: number;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
};

function inr(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export async function sendAdminEmail(order: OrderRow) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.ADMIN_EMAIL;

  if (!key || !from || !to) return;

  const subject = `New PAID order: ${order.fullName} (${inr(order.amountPaise)})`;

  const html = `
    <h2>New Paid Order</h2>
    <p><b>Order ID:</b> ${order.id}</p>
    <p><b>Amount:</b> ${inr(order.amountPaise)}</p>
    <p><b>Qty:</b> ${order.qty} (Free: ${order.freeQty}, Charged: ${order.chargeableQty})</p>
    <p><b>Name:</b> ${order.fullName}</p>
    <p><b>Phone:</b> ${order.phone}</p>
    <p><b>Email:</b> ${order.email ?? "-"}</p>
    <p><b>Address:</b> ${order.addressLine1} ${order.addressLine2 ?? ""}, ${order.city}, ${order.state} - ${order.pincode}</p>
    <p><b>Razorpay:</b> Order=${order.razorpayOrderId ?? "-"} Payment=${order.razorpayPaymentId ?? "-"}</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });
}

export async function sendCustomerEmail(order: OrderRow) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from || !order.email) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [order.email],
      subject: "Order confirmed — The Eat Right Project",
      html: `
        <p>Hi ${order.fullName},</p>
        <p>Your order is confirmed.</p>
        <p><b>Order ID:</b> ${order.id}</p>
        <p><b>Amount paid:</b> ${inr(order.amountPaise)}</p>
        <p><b>Quantity:</b> ${order.qty} (Free: ${order.freeQty})</p>
        <p>We’ll ship it soon. Thank you!</p>
      `,
    }),
  });
}
