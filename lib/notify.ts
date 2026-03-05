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
  promoCode?: string | null;
};

function inr(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

async function resendSend(args: {
  from: string;
  to: string[];
  subject: string;
  html: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
}

export async function sendAdminEmail(order: OrderRow) {
  const from = process.env.RESEND_FROM;
  const to = process.env.ADMIN_EMAIL;
  if (!from || !to) return;

  const promoLine = order.promoCode ? `Promo: ${order.promoCode}` : "Promo: —";

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#111; line-height:1.5;">
    <div style="max-width:640px; margin:0 auto; padding:24px;">
      <h2 style="margin:0 0 10px;">New PAID order ✅</h2>
      <div style="padding:14px 16px; border:1px solid #eee; border-radius:14px; background:#fafafa;">
        <p style="margin:0;"><b>Order ID:</b> ${order.id}</p>
        <p style="margin:6px 0 0;"><b>Amount:</b> ${inr(order.amountPaise)}</p>
        <p style="margin:6px 0 0;"><b>Qty:</b> ${order.qty} (Free: ${
    order.freeQty
  }, Charged: ${order.chargeableQty})</p>
        <p style="margin:6px 0 0;"><b>${promoLine}</b></p>
      </div>

      <h3 style="margin:18px 0 8px;">Customer</h3>
      <p style="margin:0;"><b>Name:</b> ${order.fullName}</p>
      <p style="margin:6px 0 0;"><b>Phone:</b> ${order.phone}</p>
      <p style="margin:6px 0 0;"><b>Email:</b> ${order.email ?? "-"}</p>

      <h3 style="margin:18px 0 8px;">Shipping</h3>
      <p style="margin:0;">
        ${order.addressLine1}${order.addressLine2 ? `, ${order.addressLine2}` : ""}
        , ${order.city}, ${order.state} - ${order.pincode}
      </p>

      <h3 style="margin:18px 0 8px;">Razorpay</h3>
      <p style="margin:0;"><b>Order:</b> ${order.razorpayOrderId ?? "-"}</p>
      <p style="margin:6px 0 0;"><b>Payment:</b> ${order.razorpayPaymentId ?? "-"}</p>
    </div>
  </div>
  `;

  await resendSend({
    from,
    to: [to],
    subject: `New paid order: ${order.fullName} (${inr(order.amountPaise)})`,
    html,
  });
}

export async function sendCustomerEmail(order: OrderRow) {
  const from = process.env.RESEND_FROM;
  if (!from || !order.email) return;

  const qtyLine =
    order.freeQty && order.freeQty > 0
      ? `${order.qty} pack(s) (includes ${order.freeQty} free)`
      : `${order.qty} pack(s)`;

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#111; line-height:1.5;">
    <div style="max-width:560px; margin:0 auto; padding:24px;">
      <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#666;">
        The Eat Right Project
      </div>

      <h1 style="margin:10px 0 0; font-size:24px;">
        Order confirmed ✅
      </h1>

      <p style="margin:12px 0 0; color:#333;">
        Hi ${order.fullName}, thanks for choosing a cleaner snack.
      </p>

      <div style="margin:18px 0; padding:14px 16px; border:1px solid #eee; border-radius:14px; background:#fafafa;">
        <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div>
            <div style="font-size:13px; color:#555;">Order ID</div>
            <div style="font-size:16px; font-weight:700;">${order.id}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:13px; color:#555;">Amount paid</div>
            <div style="font-size:16px; font-weight:700;">${inr(order.amountPaise)}</div>
          </div>
        </div>

        <div style="margin-top:10px;">
          <div style="font-size:13px; color:#555;">Quantity</div>
          <div style="font-size:15px; font-weight:600;">${qtyLine}</div>
        </div>
      </div>

      <div style="margin-top:14px; padding:14px 16px; border-radius:14px; background:#111; color:#fff;">
        <div style="font-size:14px; font-weight:700;">
          Your healthy habit, one bite at a time.
        </div>
        <div style="margin-top:6px; font-size:13px; color:rgba(255,255,255,0.8);">
          Perfect for mid-day cravings — rich, nutty chocolate energy made with simple ingredients.
        </div>
      </div>

      <p style="margin:14px 0 0; color:#333;">
        We’ll share updates as your order is processed and shipped.
      </p>

      <p style="margin:10px 0 0; color:#333;">
        Need help? Reach out to us on WhatsApp at +91 9836179444 !
      </p>

      <div style="margin-top:22px; border-top:1px solid #eee; padding-top:14px; font-size:12px; color:#888;">
        The Eat Right Project • Nutty Chocolate Coco Bites
      </div>
    </div>
  </div>
  `;

  await resendSend({
    from,
    to: [order.email],
    subject: "Order confirmed ✅ — The Eat Right Project",
    html,
  });
}
