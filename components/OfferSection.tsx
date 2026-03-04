import Link from "next/link";
import { calcOffer, PRODUCT } from "@/lib/pricing";

function OfferRow({ qty }: { qty: number }) {
  const o = calcOffer(qty);
  return (
    <div className="flex items-center justify-between rounded-2xl border border-sand-200 bg-white/70 px-4 py-4">
      <div>
        <p className="font-semibold text-sand-900">{qty} packs</p>
        <p className="text-sm text-sand-700">
          Pay for <span className="font-medium">{o.chargeable}</span> • Get{" "}
          <span className="font-medium">{o.free}</span> free
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sand-900">₹{o.subtotalInr}</p>
        <p className="text-sm text-sand-600">Save ₹{o.savingsInr}</p>
      </div>
    </div>
  );
}

export function OfferSection() {
  return (
    <section id="offer" className="container py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">Buy 2 Get 1 Free</h2>
          <p className="text-sand-700 leading-relaxed">
            The offer is applied automatically at checkout. For every 3 packs, you pay for 2.
            Perfect for sharing or stocking up.
          </p>
          <Link href="/checkout" className="btn btn-primary">Go to Checkout</Link>
          <p className="text-xs text-sand-600">
            Base price: ₹{PRODUCT.priceInr} per pack. Offer auto-calculated.
          </p>
        </div>
        <div className="card p-6 space-y-3">
          <OfferRow qty={1} />
          <OfferRow qty={3} />
          <OfferRow qty={6} />
        </div>
      </div>
    </section>
  );
}
