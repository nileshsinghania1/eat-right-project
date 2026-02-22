import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SuccessPage({ searchParams }: { searchParams: { orderId?: string } }) {
  const orderId = searchParams?.orderId;
  return (
    <main>
      <Navbar />
      <div className="container py-16">
        <div className="card p-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Payment successful 🎉</h1>
          <p className="mt-3 text-sand-700">
            Your order has been confirmed{orderId ? <> (Order ID: <span className="font-medium">{orderId}</span>)</> : null}.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/" className="btn btn-ghost">Back to Home</Link>
            <Link href="/checkout" className="btn btn-primary">Order again</Link>
          </div>
          <p className="mt-6 text-xs text-sand-600">
            Next step: integrate WhatsApp/SMS confirmation + tracking.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
