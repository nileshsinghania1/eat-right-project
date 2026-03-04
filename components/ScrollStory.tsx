"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Ingredient = {
  name: string;
  desc: string;
  emoji: string;
};

const INGREDIENTS: Ingredient[] = [
  { name: "Cashew", desc: "Creamy fats + bite texture.", emoji: "🥜" },
  { name: "Almond", desc: "Protein + crunch.", emoji: "🌰" },
  { name: "Dates", desc: "Natural sweetness, no added sugar.", emoji: "🍯" },
  { name: "Cocoa", desc: "Deep chocolate flavor.", emoji: "🍫" },
  { name: "Coconut", desc: "Aromatic, clean finish.", emoji: "🥥" },
];

function IngredientBlock({
  i,
  ingredient,
}: {
  i: number;
  ingredient: Ingredient;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <div ref={ref} className="min-h-[65vh] flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 12 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full rounded-3xl border border-sand-200 bg-white/80 p-6 shadow-soft backdrop-blur"
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl">{ingredient.emoji}</div>
          <div className="flex-1">
            <div className="text-xl font-semibold text-sand-900">
              {ingredient.name}
            </div>
            <div className="mt-1 text-sand-700">{ingredient.desc}</div>
            <div className="mt-4 text-sm text-sand-600">
              Ingredient {i + 1} of {INGREDIENTS.length}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <main className="bg-sand-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[92vh] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2 text-sm text-sand-700">
              <span className="font-medium">Nutty Chocolate Coco Bites</span>
              <span className="text-sand-400">•</span>
              <span>18% Protein</span>
              <span className="text-sand-400">•</span>
              <span>No Added Sugar</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-sand-950 md:text-5xl">
              Instant energy, clean ingredients — crafted for everyday wins.
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-sand-700">
              A rich, nutty chocolate bite made from real ingredients. No
              preservatives. No added sugar. Just a better snack.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/checkout"
                className="inline-flex items-center justify-center rounded-2xl bg-sand-900 px-6 py-3 text-white shadow-soft transition hover:opacity-90"
              >
                Buy Now
              </a>
              <div className="text-sm text-sand-700">
                ₹199 • 100g • Secure payments
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-sand-200 bg-white p-3">
                <div className="font-semibold text-sand-900">18% Protein</div>
                <div className="text-sand-700">Every bite</div>
              </div>
              <div className="rounded-2xl border border-sand-200 bg-white p-3">
                <div className="font-semibold text-sand-900">No Added Sugar</div>
                <div className="text-sand-700">Naturally sweet</div>
              </div>
              <div className="rounded-2xl border border-sand-200 bg-white p-3">
                <div className="font-semibold text-sand-900">No Preservatives</div>
                <div className="text-sand-700">Just real food</div>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-[320px] md:w-[420px]"
            >
              <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-b from-white to-sand-100 shadow-soft" />
              <div className="relative rounded-[40px] border border-sand-200 bg-white p-6">
                <Image
                  src="/product.png"
                  alt="The Eat Right Project – Nutty Chocolate Coco Bites"
                  width={900}
                  height={900}
                  priority
                  className="h-auto w-full select-none"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-12">
          <div className="flex items-center gap-3 text-sand-600">
            <div className="h-px flex-1 bg-sand-200" />
            <div className="text-sm">Scroll to meet the ingredients</div>
            <div className="h-px flex-1 bg-sand-200" />
          </div>
        </div>
      </section>

      {/* SCROLL STORY */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Sticky product */}
          <div className="relative">
            <div className="sticky top-24 rounded-3xl border border-sand-200 bg-white p-6 shadow-soft">
              <div className="text-sm font-medium text-sand-700">
                What’s inside
              </div>
              <div className="mt-2 text-2xl font-semibold text-sand-950">
                Real ingredients. Zero nonsense.
              </div>
              <p className="mt-3 text-sand-700">
                As you scroll, we’ll break down each ingredient and why it’s
                there.
              </p>

              <div className="mt-6 rounded-2xl bg-sand-50 p-4">
                <Image
                  src="/product.png"
                  alt="Product"
                  width={800}
                  height={800}
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="/checkout"
                  className="flex-1 rounded-2xl bg-sand-900 px-5 py-3 text-center text-white hover:opacity-90"
                >
                  Buy Now
                </a>
                <a
                  href="#faq"
                  className="flex-1 rounded-2xl border border-sand-300 bg-white px-5 py-3 text-center text-sand-900 hover:bg-sand-50"
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>

          {/* Ingredient blocks */}
          <div>
            {INGREDIENTS.map((ing, idx) => (
              <IngredientBlock key={ing.name} i={idx} ingredient={ing} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
