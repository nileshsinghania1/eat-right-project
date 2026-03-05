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

const SHIPPING_INR_SINGLE = 40;

export function calcOffer(qty: number, promoCode?: string) {
  // keep qty safe
  const q = Number.isFinite(qty) ? Math.max(1, Math.min(60, Math.floor(qty))) : 1;

  const normalized = (promoCode ?? "").trim().toUpperCase();
  const promoApplied = normalized.length > 0 && VALID_PROMOS.has(normalized);

  const free = promoApplied ? Math.floor(q / 3) : 0;
  const chargeable = q - free;

  const baseSubtotalInr = q * PRODUCT.priceInr;
  const subtotalInr = chargeable * PRODUCT.priceInr;
  const savingsInr = baseSubtotalInr - subtotalInr;

  // Shipping rule: qty >= 2 => Free, qty == 1 => ₹40
  const shippingInr = q >= 2 ? 0 : SHIPPING_INR_SINGLE;

  // Total customer pays
  const totalInr = subtotalInr + shippingInr;

  return {
    qty: q,
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

export function inrToPaise(inr: number) {
  return Math.round(inr * 100);
}
