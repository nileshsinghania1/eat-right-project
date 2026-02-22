export function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-white/50">
      <div className="container py-10 text-sm text-sand-700">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Eat Right Project</p>
          <p className="text-sand-600">
            Payments secured by Razorpay • Built on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
