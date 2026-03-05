export const PRODUCT = {
  id: "coco-bites-100g",
  name: "Nutty Chocolate Coco Bites",
  priceInr: 199,
  weight: "100 g",
  image: "/product.png",
  tagline: "Instant energy • 18% protein in every bite",
};

const VALID_PROMOS = new Set([
  "B2G1ARC",
  "B2G1NIL",
  "B2G1AAK",
  "B2G1AJA",
  "B2G1SRI",
]);
export function calcOffer(qty: number, promoCode?: string) {
  const SHIPPING_INR_SINGLE = 40;

export function calcOffer(qty: number, promoCode?: string) {
  const normalized = (promoCode ?? "").trim().toUpperCase();
  const promoApplied = VALID_PROMOS.has(normalized);

  const free = promoApplied ? Math.floor(qty / 3) : 0;
  const chargeable = qty - free;

  const baseSubtotalInr = qty * PRODUCT.priceInr;
  const subtotalInr = chargeable * PRODUCT.priceInr;
  const savingsInr = baseSubtotalInr - subtotalInr;

  // ✅ Shipping: qty 2+ => Free, qty 1 => ₹40
  const shippingInr = qty >= 2 ? 0 : SHIPPING_INR_SINGLE;

  // ✅ Total customer pays
  const totalInr = subtotalInr + shippingInr;

  return {
    qty,
    promoApplied,
    promoCode: promoApplied ? normalized : "",
    free,
    chargeable,
    baseSubtotalInr,
    subtotalInr,
    savingsInr,
    shippingInr,
    totalInr,
  };
}
}

export function inrToPaise(inr: number) {
  return Math.round(inr * 100);
}
