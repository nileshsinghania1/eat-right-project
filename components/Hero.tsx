"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCT } from "@/lib/pricing";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,149,120,0.20),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(223,198,179,0.35),transparent_40%)]" />
      <div className="container relative grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white/60 px-4 py-2 text-xs font-medium text-sand-700">
            <span>18% protein in every bite</span>
            <span className="text-sand-400">•</span>
            <span>No added sugar</span>
            <span className="text-sand-400">•</span>
            <span>No preservatives</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {PRODUCT.name}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-sand-700 md:text-lg">
            A clean, indulgent bite made for fast energy and better choices.
            Premium nuts + cocoa + dates — designed for everyday momentum.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/checkout" className="btn btn-primary">
              Buy Now
            </Link>
            <Link href="/#offer" className="btn btn-ghost">
              View Offer
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-sand-700">
            <span className="rounded-full bg-white/70 px-3 py-1 border border-sand-200">₹{PRODUCT.priceInr} / pack</span>
            <span className="rounded-full bg-white/70 px-3 py-1 border border-sand-200">100g</span>
            <span className="rounded-full bg-white/70 px-3 py-1 border border-sand-200">Made for India</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="card p-6 md:p-8">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src={PRODUCT.image}
                alt={PRODUCT.name}
                fill
                priority
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-sand-200/60 blur-2xl" />
          <div className="pointer-events-none absolute -top-6 -right-10 h-32 w-32 rounded-full bg-sand-300/50 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
