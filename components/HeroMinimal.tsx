import Image from "next/image";

export default function HeroMinimal() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero/hero.png"
          alt="The Eat Right Project - Nutty Chocolate Coco Bites"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlays to blend the image seamlessly */}
        {/* Dark overlays tuned to keep text readable but let the image pop */}
<div className="absolute inset-0 bg-neutral-950/35" />
<div className="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-neutral-950/35 to-neutral-950/0" />
<div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/25" />
<div className="absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.65)]" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 [box-shadow:inset_0_0_160px_rgba(0,0,0,0.85)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
            <span className="font-semibold tracking-wide">THE EAT RIGHT PROJECT</span>
            <span className="text-white/30">•</span>
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
            <div className="text-sm text-white/70">₹199 • 100g</div>
          </div>
        </div>
      </div>
    </main>
  );
}
