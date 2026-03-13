import Image from "next/image";

export default function HeroMinimal() {
  return (
    <main className="text-white">
      {/* =========================
          SECTION 1: HERO
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

          {/* Very subtle vignette */}
          <div className="absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.40)]" />

          {/* Left scrim: darkens ONLY behind text so the photo stays true */}
          <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-black/75 via-black/35 to-transparent md:w-[60%]" />

          {/* Stronger bottom fade into the next section (matches brand bg) */}
          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-neutral-900 via-neutral-900/55 to-transparent" />

          {/* Subtle noise (premium feel, avoids banding) */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')]" />
        </div>

        {/* Content */}
        <div className="container relative flex min-h-screen items-center">
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

            {/* Feastables-ish accent underline (subtle, not extra text) */}
            <div className="mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-300/90 via-amber-200/80 to-transparent" />

            {/* CTA row */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="/checkout" className="btn btn-primary w-fit px-7">
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
      <section className="relative">
        {/* Top blend so the transition feels seamless */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-neutral-900 to-transparent" />

        <div className="container grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2">
          {/* Left: Product pack image (no boxes behind it) */}
          <div className="flex items-center justify-center">
            <Image
              src="/product.png"
              alt="Nutty Chocolate Coco Bites pack"
              width={720}
              height={720}
              className="h-auto w-full max-w-[520px] select-none drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
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
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
                <div className="text-lg font-semibold">High Protein</div>
                <div className="mt-1 text-sm text-white/70">
                  A more satisfying snack for your day.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
                <div className="text-lg font-semibold">No Preservatives</div>
                <div className="mt-1 text-sm text-white/70">
                  Clean label ingredients you can trust.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
                <div className="text-lg font-semibold">No Added Sugar</div>
                <div className="mt-1 text-sm text-white/70">
                  Naturally sweet — no sugar crash.
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="/checkout" className="btn btn-primary w-fit px-7">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
