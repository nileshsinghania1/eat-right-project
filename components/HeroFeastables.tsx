import Image from "next/image";

export default function HeroFeastables() {
  return (
    <main className="min-h-screen bg-[#0b0b10] text-white">
      {/* Top brand strip */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-sm font-black tracking-widest">
          THE EAT RIGHT PROJECT
        </div>
        <a
          href="/checkout"
          className="rounded-full bg-white px-5 py-2 text-xs font-black text-black hover:opacity-90"
        >
          BUY NOW
        </a>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-16 pt-4 md:grid-cols-2 md:items-center">
        {/* Left copy */}
        <div>
          {/* Sticker pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#ffcf5a] px-4 py-2 text-xs font-black text-black">
              ₹199 • 100g
            </span>
            <span className="rounded-full border-2 border-white px-4 py-2 text-xs font-black">
              Nutty Chocolate Coco Bites
            </span>
          </div>

          {/* BIG type (Feastables-ish) */}
          <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            YOUR
            <span className="block">
              EVERYDAY{" "}
              <span className="inline-block -rotate-2 bg-[#ff4d6d] px-3 py-1 text-black">
                ENERGY
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base font-semibold text-white/80 md:text-lg">
            Ideal for your mid day cravings — rich, nutty chocolate goodness with
            a cleaner feel.
          </p>

          {/* Chunky feature blocks */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#2b59ff] p-4">
              <div className="text-xs font-black tracking-widest text-white/80">
                FEATURE
              </div>
              <div className="mt-2 text-sm font-black">HIGH PROTEIN</div>
            </div>

            <div className="rounded-2xl bg-[#22c55e] p-4">
              <div className="text-xs font-black tracking-widest text-black/70">
                FEATURE
              </div>
              <div className="mt-2 text-sm font-black text-black">
                NO PRESERVATIVES
              </div>
            </div>

            <div className="rounded-2xl bg-[#ffcf5a] p-4">
              <div className="text-xs font-black tracking-widest text-black/70">
                FEATURE
              </div>
              <div className="mt-2 text-sm font-black text-black">
                NO ADDED SUGAR
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/checkout"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black text-black hover:opacity-90"
            >
              CHECKOUT →
            </a>
            <div className="text-xs font-semibold text-white/70">
              Secure payments • Fast checkout
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative">
          {/* Graphic blobs behind */}
          <div className="absolute -top-10 left-6 h-48 w-48 rotate-12 rounded-[36px] bg-[#ff4d6d] opacity-90" />
          <div className="absolute top-24 -right-2 h-56 w-56 -rotate-6 rounded-[44px] bg-[#2b59ff] opacity-80" />
          <div className="absolute -bottom-8 left-10 h-44 w-44 rotate-6 rounded-[34px] bg-[#ffcf5a] opacity-85" />

          {/* Product image */}
          <div className="relative mx-auto w-full max-w-[520px] -rotate-2">
            <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-[44px] bg-black/60" />
            <div className="relative rounded-[44px] border-2 border-white/15 bg-white/5 p-6">
              <Image
                src="/product.png"
                alt="Nutty Chocolate Coco Bites"
                width={900}
                height={900}
                className="h-auto w-full select-none"
                priority
              />
            </div>
          </div>

          {/* Optional: use your hero photo as a subtle backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]">
            <Image
              src="/hero/hero.png"
              alt=""
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
