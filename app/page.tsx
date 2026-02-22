"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShoppingCart, Heart, Zap, Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#FAF7F2] min-h-[300vh] text-[#3C2A21] font-sans selection:bg-green-200 overflow-x-hidden">
      
      {/* 1. FIXED NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 p-6 flex justify-between items-center px-10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black italic tracking-tighter"
        >
          THE EAT RIGHT PROJECT
        </motion.h1>
        <div className="flex items-center gap-6">
          <button className="hidden md:block font-bold text-sm uppercase tracking-widest hover:text-green-700 transition">Our Story</button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#3C2A21] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl"
          >
            <ShoppingCart size={18} /> Shop Now
          </motion.button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center pt-20 relative px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
            Founders Recipe • 100% Clean
          </span>
          <h2 className="text-7xl md:text-9xl font-serif leading-none">
            Clean Energy. <br/> <span className="italic text-green-700">Real Bites.</span>
          </h2>
        </motion.div>

        {/* MOTHERS LOVE STAMP (Animated on scroll) */}
        <motion.div 
          style={{ rotate: 15 }}
          whileInView={{ scale: [0, 1.2, 1], rotate: [15, -5, 10] }}
          className="absolute right-10 top-1/2 bg-yellow-400 p-4 rounded-full border-2 border-[#3C2A21] shadow-2xl z-20"
        >
          <p className="font-black text-[10px] text-center uppercase leading-tight">Handcrafted with <br/> Mother's Love ❤️</p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown size={32} className="opacity-30" />
        </motion.div>
      </section>

      {/* 3. PRODUCT EXPLOSION (The "Magic" Section) */}
      <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        {/* Central Product Image */}
        <motion.div
          whileInView={{ scale: [0.8, 1], rotate: [0, 2] }}
          className="relative z-30 w-full max-w-md px-10"
        >
          <img src="/20260207_214106.jpg" alt="Nutty Chocolate Coco Bites" className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]" />
        </motion.div>

        {/* Floating Ingredients - These appear as you scroll */}
        {[
          { icon: <Zap color="#FFD700" />, label: "Instant Energy", x: -300, y: -200 },
          { icon: <Heart color="#FF6B6B" />, label: "No Added Sugar", x: 300, y: -150 },
          { icon: <Leaf color="#4CAF50" />, label: "100% Plant Based", x: -280, y: 200 },
          { icon: <span className="text-2xl font-black">18%</span>, label: "Protein Rich", x: 320, y: 180 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: item.x, y: item.y }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
            className="absolute z-20 flex flex-col items-center gap-2 bg-white p-6 rounded-3xl shadow-2xl border border-stone-100"
          >
            {item.icon}
            <p className="font-bold text-xs uppercase tracking-tighter whitespace-nowrap">{item.label}</p>
          </motion.div>
        ))}
      </section>

      {/* 4. THE INGREDIENTS STRIP */}
      <section className="min-h-screen bg-[#3C2A21] text-white flex flex-col justify-center items-center py-40">
        <h3 className="text-sm font-bold tracking-[0.4em] uppercase opacity-50 mb-20">Inside every 10g bite</h3>
        <div className="flex flex-col gap-12 text-center">
          {['Premium Dates', 'Roasted Almonds', 'Creamy Cashews', 'Pure Cocoa'].map((ing, i) => (
            <motion.h4 
              key={i}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              className="text-5xl md:text-8xl font-serif italic hover:text-green-400 transition cursor-default"
            >
              {ing}
            </motion.h4>
          ))}
        </div>
      </section>
    </div>
  );
}
