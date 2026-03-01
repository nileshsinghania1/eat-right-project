import Image from "next/image";

export default function HeroMinimal() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
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
            <span className="font-semibold tracking-wide">THE EAT RIGHT PROJECT</span>
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
    </main>
  );
}
