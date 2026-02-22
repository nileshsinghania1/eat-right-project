# The Eat Right Project — Starter (Next.js + Razorpay + Postgres)

This is a production-ready starter for a single-product D2C site for India.
It includes:
- Next.js App Router + Tailwind + Framer Motion (premium UI)
- Razorpay payment flow (create order + verify signature + optional webhook)
- Postgres persistence via Prisma (orders table)
- Offer logic: **Buy 2 Get 1 Free** (applied automatically)

## 1) Setup

```bash
npm i
```

Create `.env.local`:

```bash
# Razorpay (server)
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx

# Razorpay (client)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx

# Optional: webhook verification secret (recommended)
RAZORPAY_WEBHOOK_SECRET=xxx

# Postgres
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

# Optional: protect /admin
ADMIN_TOKEN=some-long-random-token
```

## 2) Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 3) Run locally

```bash
npm run dev
```

## 4) Deploy (Vercel)

- Import GitHub repo into Vercel
- Add env vars in Vercel Project Settings (Preview + Production)
- Add your domains `theeatrightproject.in` + `www.theeatrightproject.in`

## Notes

- Product image lives at `public/product.png` (replace with your best photo).
- Offer logic is in `lib/pricing.ts`.
- Checkout form validation is in `lib/validators.ts`.
