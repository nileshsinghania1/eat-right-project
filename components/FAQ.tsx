const faqs = [
  { q: "How does Buy 2 Get 1 Free work?", a: "For every 3 packs in your order, 1 pack is free. Add 3, pay for 2 — the discount is automatic." },
  { q: "Do you deliver across India?", a: "Yes. Shipping partners and ETA can vary by pincode. You'll see confirmation after payment." },
  { q: "Is there added sugar?", a: "No added sugar. Sweetness comes naturally from dates." },
  { q: "How do I contact support?", a: "Add your WhatsApp number/email in the footer once ready. You can also integrate WhatsApp order updates later." },
];

export function FAQ() {
  return (
    <section id="faq" className="container py-14 md:py-20">
      <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {faqs.map((f) => (
          <div key={f.q} className="card p-6">
            <p className="font-semibold">{f.q}</p>
            <p className="mt-2 text-sm text-sand-700">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
