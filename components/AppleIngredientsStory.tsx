"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Chapter = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Ingredient 01",
    title: "Cashew.",
    subtitle: "Creamy body. Smooth bite. Clean energy.",
    image: "/ingredients/cashewspng.png",
    alt: "Cashew",
  },
  {
    eyebrow: "Ingredient 02",
    title: "Almond.",
    subtitle: "Crunch + protein. A stronger snack base.",
    image: "/ingredients/almondspng.png",
    alt: "Almonds",
  },
  {
    eyebrow: "Ingredient 03",
    title: "Dates.",
    subtitle: "Naturally sweet — no added sugar needed.",
    image: "/ingredients/datespng.png",
    alt: "Dates",
  },
  {
    eyebrow: "Ingredient 04",
    title: "Cocoa.",
    subtitle: "Deep chocolate finish without the heaviness.",
    image: "/ingredients/cocoapowderpng.png",
    alt: "Cocoa powder",
  },
  {
    eyebrow: "Ingredient 05",
    title: "Coconut.",
    subtitle: "A clean aroma and soft texture balance.",
    image: "/ingredients/coconutpng.png",
    alt: "Coconut",
  },
  // Optional: whey
  // {
  //   eyebrow: "Ingredient 06",
  //   title: "Whey.",
  //   subtitle: "Extra protein support for everyday performance.",
  //   image: "/ingredients/wheyproteinpng.png",
  //   alt: "Whey protein",
  // },
];

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-56 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-[10%] left-[6%] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute top-[35%] right-[6%] h-[520px] w-[520px] rounded-full bg-amber-400/10 blur-3xl" />
    </div>
  );
}

function ChapterBlock({ c, index }: { c: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  // Apple-ish motion: ease in, sharpen, then ease out
  const y = useTransform(scrollYProgress, [0, 1], [30, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
    return (
    <div ref={ref} className="min-h-[78vh] flex items-center">
      <div className="w-full">
        <div className="text-xs uppercase tracking-[0.2em] text-white/55">
          {c.eyebrow}
        </div>

        <h3 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {c.title}
        </h3>

        <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/70">
          {c.subtitle}
        </p>

        <motion.div
          style={{ y, opacity, scale }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="absolute -inset-10 bg-gradient-to-b from-white/10 to-transparent opacity-60 blur-2xl" />
            <div className="relative">
              <Image
                src={c.image}
                alt={c.alt}
                width={1200}
                height={900}
                className="h-auto w-full select-none object-contain"
                priority={index < 2}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AppleIngredientsStory() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTitleY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const heroTitleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  return (
    <main className="bg-neutral-950 text-white">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[95vh] overflow-hidden">
        <Glow />
        <div className="mx-auto grid min-h-[95vh] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
          <motion.div style={{ y: heroTitleY, opacity: heroTitleOpacity }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
              <span className="font-medium tracking-wide">
                THE EAT RIGHT PROJECT
              </span>
              <span className="text-white/30">•</span>
              <span>Nutty Chocolate Coco Bites</span>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
              A better bite.
              <span className="block text-white/70">Designed to feel premium.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Rich, nutty chocolate energy — built from real ingredients.
              <span className="block">
                18% protein • No added sugar • No preservatives
              </span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/checkout"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:opacity-90"
              >
                Buy Now
              </a>
              <div className="text-sm text-white/70">₹199 • 100g</div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">18% Protein</div>
                <div className="mt-1 text-xs text-white/60">Every bite</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">No Added Sugar</div>
                <div className="mt-1 text-xs text-white/60">Naturally sweet</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">No Preservatives</div>
                <div className="mt-1 text-xs text-white/60">Clean label</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            style={{ y, opacity, scale }}
          >
            <div className="relative w-[320px] md:w-[430px]">
              <div className="absolute -inset-10 rounded-[48px] bg-white/5 blur-2xl" />
              <div className="relative rounded-[40px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <Image
                  src="/product.png"
                  alt="The Eat Right Project - Coco Bites"
                  width={900}
                  height={900}
                  priority
                  className="h-auto w-full select-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-10">
          <div className="flex items-center gap-3 text-white/60">
            <div className="h-px flex-1 bg-white/10" />
            <div className="text-xs tracking-widest uppercase">
              Scroll for ingredients
            </div>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      </section>

      {/* CHAPTERS (Apple-like story) */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Sticky product */}
            <div className="relative">
              <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Ingredients
                </div>
                <div className="mt-3 text-3xl font-semibold">
                  Made from real food.
                </div>
                <p className="mt-3 text-white/70">
                  Each ingredient plays a role. Scroll to see them.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 p-5">
                  <Image
                    src="/product.png"
                    alt="Product"
                    width={900}
                    height={900}
                    className="h-auto w-full"
                  />
                </div>

                <div className="mt-6">
                  <a
                    href="/checkout"
                    className="block rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-neutral-950 hover:opacity-90"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>

            {/* Scroll “chapters” */}
            <div>
              {CHAPTERS.map((c, idx) => (
                <ChapterBlock key={c.title} c={c} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
