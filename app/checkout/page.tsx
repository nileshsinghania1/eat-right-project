import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutClient } from "@/components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <main>
      <Navbar />
      <CheckoutClient />
      <Footer />
    </main>
  );
}
