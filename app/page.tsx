import React from 'react';

export default function EatRightLanding() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#4A3728] font-sans selection:bg-green-200">
      {/* 1. URGENCY BAR */}
      <div className="bg-[#3C2A21] text-white text-center py-2 text-sm font-bold tracking-widest uppercase">
        🚀 Launch Offer: Free Shipping on all orders above ₹499!
      </div>

      {/* 2. NAVIGATION */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-black italic tracking-tighter">THE EAT RIGHT PROJECT</h1>
        <button className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition shadow-lg">
          Buy Now
        </button>
      </nav>

      {/* 3. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center py-12">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="bg-white border border-stone-200 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-stone-500">
              Founder's Recipe 👩‍🍳
            </span>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              100% Natural
            </span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] text-[#3C2A21]">
            Nutty Chocolate <br/>
            <span className="italic text-green-700">Coco Bites</span>
          </h2>

          <p className="text-xl leading-relaxed text-stone-600 max-w-md">
            The perfect 10g bite. Packed with dates, almonds, and cashews for instant energy. No preservatives. No added sugar. Just pure love.
          </p>

          <div className="flex flex-col gap-4 pt-4">
            <button className="bg-[#3C2A21] text-white text-2xl py-6 px-12 rounded-2xl font-black shadow-2xl hover:scale-105 transition transform">
              Order 100g Pack — ₹199
            </button>
            <p className="text-center md:text-left text-sm font-medium text-stone-400">
              Contains 10 high-protein bites per pack.
            </p>
          </div>
        </div>

        {/* Product Visual Area */}
        <div className="relative group">
          <div className="absolute inset-0 bg-yellow-200 rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/50 backdrop-blur-sm p-12 rounded-[60px] border border-white/50 shadow-2xl">
            <div className="aspect-square bg-stone-100 rounded-3xl flex items-center justify-center border-4 border-dashed border-stone-200">
               <p className="text-stone-400 font-bold uppercase tracking-widest">Upload 20260207_214106.jpg Here</p>
            </div>
            {/* 18% Protein Badge */}
            <div className="absolute -top-6 -right-6 bg-green-600 text-white w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl rotate-12 border-4 border-white">
              <span className="text-3xl font-black">18%</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Protein in <br/> every bite</span>
            </div>
          </div>
        </div>
      </main>

      {/* 4. INGREDIENTS STRIP */}
      <section className="bg-white py-20 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-stone-400 mb-12">Only Clean Ingredients</h3>
          <div className="flex flex-wrap justify-center gap-12">
            {['Roasted Almonds', 'Creamy Cashews', 'Organic Dates', 'Pure Cocoa'].map((item) => (
              <div key={item} className="group cursor-default">
                <p className="text-2xl font-serif italic text-stone-800 group-hover:text-green-700 transition">{item}</p>
                <div className="h-0.5 w-0 group-hover:w-full bg-green-700 transition-all duration-500 mx-auto mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
<div className="relative w-full h-[500px] overflow-hidden rounded-[40px] shadow-2xl border-8 border-white">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="Video_Generation_With_Activity_Keywords.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  
  {/* The 18% Protein Badge floating on top of the video */}
  <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-full shadow-2xl z-10">
    <p className="text-center font-bold leading-none">18% <br/> <span className="text-[10px] uppercase">Protein</span></p>
  </div>
</div>
