import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function inr(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams?.orderId;

  const order = orderId
    ? await prisma.order.findUnique({ where: { id: orderId } })
    : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(255,220,180,0.12),transparent),radial-gradient(900px_500px_at_80%_30%,rgba(255,140,80,0.10),transparent)] bg-neutral-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold tracking-wide">
            THE EAT RIGHT PROJECT
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur hover:bg-white/10"
          >
            Home
          </Link>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left: message */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
              Payment successful <span className="text-white/40">•</span> Order
              confirmed
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              You’re all set ✅
              <span className="mt-3 block text-white/70">
                A healthier habit starts now.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-white/70">
              Thanks for choosing a cleaner snack for your mid-day cravings.
              We’ll process your order and share updates soon.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 hover:opacity-90"
              >
                Continue shopping
              </Link>
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10"
              >
                Buy again
              </Link>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              Tip: keep a pack at your desk — your “mid-day” you will thank you.
            </div>
          </div>

          {/* Right: summary */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src="/product.png"
                  alt="Nutty Chocolate Coco Bites"
                  width={256}
                  height={256}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-sm font-semibold">
                  Nutty Chocolate Coco Bites
                </div>
                <div className="text-xs text-white/60">100 g</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Status</span>
                <span className="text-white">PAID</span>
              </div>

              <div className="flex justify-between text-white/70">
                <span>Order ID</span>
                <span className="text-white">{order?.id ?? orderId ?? "—"}</span>
              </div>

              <div className="flex justify-between text-white/70">
                <span>Packs</span>
                <span className="text-white">{order?.qty ?? "—"}</span>
              </div>

              <div className="flex justify-between text-white/70">
                <span>Free packs</span>
                <span className="text-white">{order?.freeQty ?? "—"}</span>
              </div>

              {order?.promoCode ? (
                <div className="flex justify-between text-white/70">
                  <span>Promo</span>
                  <span className="text-white">{order.promoCode}</span>
                </div>
              ) : null}

              <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{order?.amountPaise ? inr(order.amountPaise) : "—"}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/55">
              You will shortly receive an email .
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
