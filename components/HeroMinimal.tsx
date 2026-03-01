import Image from "next/image";

export default function HeroMinimal() {
  return (
    <main className="bg-neutral-950 text-white">
      {/* =========================
          SECTION 1: HERO (as you liked)
         ========================= */}
      <section className="relative min-h-screen">
        {/* Background image (kept as close to original as possible) */}
        <div className="absolute inset-0">
          <Image
            src="/hero/hero.png"
            alt="The Eat Right Project - Nutty Chocolate Coco Bites"
            fill
            priority
            className="object-cover"
          />

          {/* Very subtle vignette (light) */}
          <div className="absolute inset-0 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.35)]" />

          {/* Left scrim: darkens ONLY behind text so the photo stays true */}
          <div className="absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-black/70 via-black/35 to-transparent md:w-[58%]" />

          {/* Tiny bottom fade for polish */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6">
          <div className="max-w-2xl md:pr-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/85 backdrop-blur">
              <span className="font-semibold tracking-wide">
                THE EAT RIGHT PROJECT
              </span>
              <span className="text-white/35">•</span>
              <span>Nutty Chocolate Coco Bites</span>
            </div>

            {/* Headline */}
            <h1 className="mt-8 text-5xl font-semibold tracking-tight md:text-6xl">
              Your everyday energy
              <span className="mt-3 block text-white/70">
                Ideal for your mid day cravings
              </span>
            </h1>

            {/* CTA row */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/checkout"
                className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition hover:opacity-90"
              >
                Buy Now
              </a>
              <div className="text-sm text-white/75">₹199 • 100g</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 2: FEATURES (next scroll)
         ========================= */}
      <section className="bg-neutral-950">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          {/* Left: Product pack image (no boxes behind it) */}
          <div className="flex items-center justify-center">
            <Image
              src="/product.png"
              alt="Nutty Chocolate Coco Bites pack"
              width={720}
              height={720}
              className="h-auto w-full max-w-[520px] select-none"
              priority={false}
            />
          </div>

          {/* Right: Feature rectangles */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/55">
              Why you’ll love it
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Clean. Simple. Effective.
            </h2>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-lg font-semibold">High Protein</div>
                <div className="mt-1 text-sm text-white/70">
                  A more satisfying snack for your day.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-lg font-semibold">No Preservatives</div>
                <div className="mt-1 text-sm text-white/70">
                  Clean label ingredients you can trust.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-lg font-semibold">No Added Sugar</div>
                <div className="mt-1 text-sm text-white/70">
                  Naturally sweet — no sugar crash.
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/checkout"
                className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-7 py-3 text-sm font-semibold text-neutral-950 transition hover:opacity-90"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
