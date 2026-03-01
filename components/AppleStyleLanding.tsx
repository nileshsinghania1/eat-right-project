"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const INGREDIENTS = [
  { title: "Cashew", subtitle: "Creamy body. Smooth energy.", tag: "🥜" },
  { title: "Almond", subtitle: "Crunch + protein bite.", tag: "🌰" },
  { title: "Dates", subtitle: "Natural sweetness. No added sugar.", tag: "🍯" },
  { title: "Cocoa", subtitle: "Deep chocolate finish.", tag: "🍫" },
  { title: "Coconut", subtitle: "Clean aroma + texture.", tag: "🥥" },
];

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-[20%] left-[8%] h-[420px] w-[420px] rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute top-[35%] right-[8%] h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-3xl" />
    </div>
  );
}

export default function AppleStyleLanding() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);

  // Hero scroll effects
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTitleY = useTransform(heroP, [0, 1], [0, 40]);
  const heroTitleOpacity = useTransform(heroP, [0, 1], [1, 0.2]);
  const heroImgY = useTransform(heroP, [0, 1], [0, 80]);
  const heroImgScale = useTransform(heroP, [0, 1], [1, 0.92]);

  // Story scroll effects (ingredient reveals)
  const { scrollYProgress: storyP } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  // Product “breathes” slightly through the section
  const productRotate = useTransform(storyP, [0, 1], [-1.5, 1.5]);
  const productY = useTransform(storyP, [0, 1], [0, -10]);

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
              <span className="block text-white/70">Built from real food.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Rich, nutty chocolate energy — made with simple ingredients.
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
            style={{ y: heroImgY, scale: heroImgScale }}
          >
            <div className="relative w-[320px] md:w-[420px]">
              <div className="absolute -inset-8 rounded-[48px] bg-white/5 blur-2xl" />
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

      {/* STORY (Sticky product + scroll reveals) */}
      <section ref={storyRef} className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Sticky product */}
            <div className="relative">
              <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-xs uppercase tracking-widest text-white/60">
                  What’s inside
                </div>
                <div className="mt-3 text-3xl font-semibold">
                  Ingredients that do the work.
                </div>
                <p className="mt-3 text-white/70">
                  Scroll. Each ingredient reveals why it’s there.
                </p>

                <motion.div
                  className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 p-4"
                  style={{ rotate: productRotate, y: productY }}
                >
                  <Image
                    src="/product.png"
                    alt="Product"
                    width={900}
                    height={900}
                    className="h-auto w-full"
                  />
                </motion.div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="/checkout"
                    className="flex-1 rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-neutral-950 hover:opacity-90"
                  >
                    Buy Now
                  </a>
                  <a
                    href="#details"
                    className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm text-white hover:bg-white/10"
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>

            {/* Ingredient “chapters” */}
            <div className="space-y-10">
              {INGREDIENTS.map((ing, idx) => (
                <motion.div
                  key={ing.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.45 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-2xl font-semibold">{ing.title}</div>
                      <div className="mt-2 text-white/70">{ing.subtitle}</div>
                    </div>
                    <div className="text-3xl opacity-90">{ing.tag}</div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs text-white/50">
                    <div className="uppercase tracking-widest">Ingredient</div>
                    <div>
                      {idx + 1} / {INGREDIENTS.length}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS (minimal footer section for now) */}
      <section id="details" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Made for India</div>
              <div className="mt-2 text-sm text-white/70">
                UPI, cards, netbanking — fast checkout.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Clean label</div>
              <div className="mt-2 text-sm text-white/70">
                No preservatives. No added sugar.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Support</div>
              <div className="mt-2 text-sm text-white/70">
                Email us anytime for help with orders.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
