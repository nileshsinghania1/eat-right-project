import React from 'react';

// This is your Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FCF9F5] text-[#3C2A21] font-sans selection:bg-green-200">
      {/* 1. NAVIGATION */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-xl font-black tracking-tighter border-2 border-[#3C2A21] px-2 py-1">
          THE EAT RIGHT PROJECT
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#story" className="hover:text-green-700">Our Story</a>
          <a href="#ingredients" className="hover:text-green-700">Ingredients</a>
        </div>
        <button className="bg-[#3C2A21] text-white px-6 py-2 rounded-full font-bold hover:bg-green-800 transition-colors">
          Order Now
        </button>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="px-6 py-16 md:py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            100% CLEAN LABEL
          </div>
          <h1 className="text-6xl md:text-8xl font-serif leading-tight">
            Nutty Chocolate <br/> 
            <span className="italic text-green-700 underline decoration-yellow-400">Coco Bites</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-md leading-relaxed">
            10 bites of pure energy. No added sugar, no preservatives, and 18% protein in every single bite.
          </p>
          <div className="pt-4">
            <button className="bg-[#3C2A21] text-[#FCF9F5] text-2xl px-12 py-5 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform active:scale-95">
              Grab Your 100g Pack
            </button>
            <p className="mt-4 text-sm font-medium text-gray-500 italic">Made with Mother's Love ❤️</p>
          </div>
        </div>

        {/* Product Visual */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 to-transparent rounded-full blur-3xl"></div>
          <div className="relative bg-white p-8 rounded-[40px] shadow-2xl border border-stone-100">
             {/* Replace this with your photo later */}
             <div className="aspect-square bg-stone-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-200 text-stone-400">
                [High Quality Image of the Bag Here]
             </div>
          </div>
        </div>
      </section>

      {/* 3. THE "WHY" SECTION (India-Specific Trust Signals) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Protein", val: "18%", sub: "Muscle Recovery" },
            { label: "Sugar", val: "0%", sub: "No Added Junk" },
            { label: "Bites", val: "10", sub: "Perfectly Portioned" },
            { label: "Plant Based", val: "100%", sub: "Purely Veg" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 border-r last:border-0 border-stone-100">
              <h3 className="text-4xl font-serif font-bold text-green-700">{stat.val}</h3>
              <p className="font-bold text-sm uppercase tracking-widest mt-2">{stat.label}</p>
              <p className="text-xs text-stone-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INGREDIENTS LIST */}
      <section id="ingredients" className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 italic">Just 4 Real Ingredients. Nothing Else.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Premium Dates', 'Roasted Almonds', 'Creamy Cashews', 'Pure Cocoa'].map((ing) => (
            <span key={ing} className="px-8 py-4 bg-stone-100 rounded-full border border-stone-200 font-bold hover:bg-[#3C2A21] hover:text-white transition-colors cursor-default">
              {ing}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
