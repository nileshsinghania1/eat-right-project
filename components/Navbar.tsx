import Link from "next/link";
import { PRODUCT } from "@/lib/pricing";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-sand-900">THE EAT RIGHT</span>{" "}
          <span className="text-sand-600">PROJECT</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link className="text-sm text-sand-700 hover:text-sand-900" href="/#ingredients">
            Ingredients
          </Link>
          <Link className="text-sm text-sand-700 hover:text-sand-900" href="/#faq">
            FAQ
          </Link>
          <Link href="/checkout" className="btn btn-primary">
            Buy Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
