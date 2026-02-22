import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OfferSection } from "@/components/OfferSection";
import { Ingredients } from "@/components/Ingredients";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OfferSection />
      <Ingredients />
      <FAQ />
      <Footer />
    </main>
  );
}
