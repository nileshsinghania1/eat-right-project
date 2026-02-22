import { prisma } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

function maskPhone(phone: string) {
  return phone.slice(0, 2) + "******" + phone.slice(-2);
}

export default async function AdminPage() {
  // Extremely simple protection: set ADMIN_TOKEN and append ?token=...
  // For real production, use NextAuth or Vercel protected routes.
  // Here we just show the page; you can protect at middleware later.
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main>
      <Navbar />
      <div className="container py-10">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="mt-2 text-sm text-sand-700">Latest 50 orders (demo admin).</p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-sand-700">
                <tr className="border-b border-sand-200">
                  <th className="py-2 pr-4">Created</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Qty</th>
                  <th className="py-2 pr-4">Free</th>
                  <th className="py-2 pr-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-sand-100">
                    <td className="py-2 pr-4">{o.createdAt.toISOString().slice(0, 16).replace("T"," ")}</td>
                    <td className="py-2 pr-4 font-medium">{o.status}</td>
                    <td className="py-2 pr-4">{o.fullName}</td>
                    <td className="py-2 pr-4">{maskPhone(o.phone)}</td>
                    <td className="py-2 pr-4">{o.qty}</td>
                    <td className="py-2 pr-4">{o.freeQty}</td>
                    <td className="py-2 pr-4">₹{(o.amountPaise/100).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
