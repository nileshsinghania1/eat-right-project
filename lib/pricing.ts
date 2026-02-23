export const PRODUCT = {
  id: "coco-bites-100g",
  name: "Nutty Chocolate Coco Bites",
  priceInr: 199,
  weight: "100 g",
  image: "/product.png",
  tagline: "Instant energy • 18% protein in every bite",
};

const VALID_PROMOS = new Set(["B2G1", "BUY2GET1", "BUY2GET1FREE"]);

export function calcOffer(qty: number, promoCode?: string) {
  const normalized = (promoCode ?? "").trim().toUpperCase();
  const promoApplied = VALID_PROMOS.has(normalized);

  // Only apply Buy2Get1 when promo code is applied
  const free = promoApplied ? Math.floor(qty / 3) : 0;

  const chargeable = qty - free;

  // What the customer would pay without any promo
  const baseSubtotalInr = qty * PRODUCT.priceInr;

  // What the customer pays after promo (if applied)
  const subtotalInr = chargeable * PRODUCT.priceInr;

  // Savings only when promo is applied
  const savingsInr = baseSubtotalInr - subtotalInr;

  return {
    qty,
    promoApplied,
    promoCode: promoApplied ? normalized : "",
    free,
    chargeable,
    baseSubtotalInr,
    subtotalInr,
    savingsInr,
  };
}

export function inrToPaise(inr: number) {
  return Math.round(inr * 100);
}
