export const PRODUCT = {
  id: "coco-bites-100g",
  name: "Nutty Chocolate Coco Bites",
  priceInr: 199,
  weight: "100 g",
  image: "/product.png",
  tagline: "Instant energy • 18% protein in every bite",
};

export function calcOffer(qty: number) {
  // Buy 2 get 1 free => for every 3 units, 1 is free.
  const free = Math.floor(qty / 3);
  const chargeable = qty - free;
  const subtotalInr = chargeable * PRODUCT.priceInr;
  const savingsInr = free * PRODUCT.priceInr;
  return { qty, free, chargeable, subtotalInr, savingsInr };
}

export function inrToPaise(inr: number) {
  return Math.round(inr * 100);
}
