import { Sparkles, Leaf, Zap, ShieldCheck } from "lucide-react";

const items = [
  { title: "Premium nuts", desc: "Cashew + almond richness for satisfying bites.", icon: Sparkles },
  { title: "Cocoa-forward", desc: "Deep chocolate notes without added sugar.", icon: Leaf },
  { title: "Instant energy", desc: "Dates deliver a quick, natural lift.", icon: Zap },
  { title: "Clean label", desc: "No preservatives — straightforward ingredients.", icon: ShieldCheck },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="container py-14 md:py-20">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Simple ingredients. Big taste.</h2>
        <p className="mt-2 max-w-2xl text-sand-700">
          A snack built around real ingredients — designed for quick energy, better satiety,
          and that “one more bite” chocolate feel.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="card p-6">
            <it.icon className="h-6 w-6 text-sand-700" />
            <p className="mt-3 font-semibold">{it.title}</p>
            <p className="mt-2 text-sm text-sand-700">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
