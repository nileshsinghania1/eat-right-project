"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators";
import { calcOffer, PRODUCT } from "@/lib/pricing";

declare global {
  interface Window {
    Razorpay: any;
  }
}

async function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const s = document.createElement("script");
    s.id = "razorpay-sdk";
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export function CheckoutClient() {
  const [qty, setQty] = useState(3);
  const offer = useMemo(() => calcOffer(qty), [qty]);

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      qty,
      fullName: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    },
    mode: "onBlur",
  });

  // keep qty in sync
  function setQtySafe(n: number) {
    const next = Math.max(1, Math.min(60, n));
    setQty(next);
    form.setValue("qty", next, { shouldValidate: true });
  }

  const [busy, setBusy] = useState(false);

  async function onSubmit(values: CheckoutInput) {
    setBusy(true);
    const ok = await loadRazorpay();
    if (!ok) {
      alert("Failed to load Razorpay.");
      setBusy(false);
      return;
    }

    // Create order on server
    const res = await fetch("/api/checkout/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error ?? "Checkout failed.");
      setBusy(false);
      return;
    }

    const { razorpayOrder, orderId } = await res.json();

    const rzp = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "The Eat Right Project",
      description: "Nutty Chocolate Coco Bites",
      prefill: {
        name: values.fullName,
        contact: values.phone,
        email: values.email || undefined,
      },
      notes: {
        orderId,
        offer: "BUY2GET1",
      },
      handler: async (response: any) => {
        const vr = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, orderId }),
        });

        if (vr.ok) {
          window.location.href = `/success?orderId=${orderId}`;
        } else {
          alert("Payment verification failed. If money was deducted, contact support.");
        }
      },
      theme: { color: "#6f4f3e" },
      modal: {
        ondismiss: () => setBusy(false),
      },
    });

    rzp.open();
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="card p-6 md:p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
          <p className="mt-2 text-sm text-sand-700">
            Offer applies automatically: Buy 2 get 1 free.
          </p>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-sand-200 bg-white/70 p-4">
            <div>
              <p className="font-semibold">{PRODUCT.name}</p>
              <p className="text-sm text-sand-700">₹{PRODUCT.priceInr} • {PRODUCT.weight}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost px-3 py-2" onClick={() => setQtySafe(qty - 1)} type="button">−</button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button className="btn btn-ghost px-3 py-2" onClick={() => setQtySafe(qty + 1)} type="button">+</button>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label className="label">Full name</label>
              <input className="input" {...form.register("fullName")} placeholder="Your name" />
              {form.formState.errors.fullName && (
                <p className="mt-1 text-xs text-red-700">{form.formState.errors.fullName.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label">Mobile number</label>
                <input className="input" {...form.register("phone")} placeholder="10-digit number" />
                {form.formState.errors.phone && (
                  <p className="mt-1 text-xs text-red-700">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="label">Email (optional)</label>
                <input className="input" {...form.register("email")} placeholder="name@email.com" />
                {form.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-700">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="label">Address line 1</label>
              <input className="input" {...form.register("addressLine1")} placeholder="House no, street, area" />
              {form.formState.errors.addressLine1 && (
                <p className="mt-1 text-xs text-red-700">{form.formState.errors.addressLine1.message}</p>
              )}
            </div>

            <div>
              <label className="label">Address line 2 (optional)</label>
              <input className="input" {...form.register("addressLine2")} placeholder="Landmark, apartment, etc." />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="label">City</label>
                <input className="input" {...form.register("city")} />
                {form.formState.errors.city && (
                  <p className="mt-1 text-xs text-red-700">{form.formState.errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="label">State</label>
                <input className="input" {...form.register("state")} />
                {form.formState.errors.state && (
                  <p className="mt-1 text-xs text-red-700">{form.formState.errors.state.message}</p>
                )}
              </div>
              <div>
                <label className="label">Pincode</label>
                <input className="input" {...form.register("pincode")} />
                {form.formState.errors.pincode && (
                  <p className="mt-1 text-xs text-red-700">{form.formState.errors.pincode.message}</p>
                )}
              </div>
            </div>

            <button className="btn btn-primary w-full" type="submit" disabled={busy}>
              {busy ? "Opening payment…" : `Pay ₹${offer.subtotalInr}`}
            </button>

            <p className="text-xs text-sand-600">
              You’re ordering <span className="font-medium">{offer.qty}</span> packs.
              You get <span className="font-medium">{offer.free}</span> free.
              Savings: <span className="font-medium">₹{offer.savingsInr}</span>.
            </p>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card p-6 md:p-8">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Packs</span>
                <span>{offer.qty}</span>
              </div>
              <div className="flex justify-between">
                <span>Free packs</span>
                <span>{offer.free}</span>
              </div>
              <div className="flex justify-between">
                <span>Payable packs</span>
                <span>{offer.chargeable}</span>
              </div>
              <div className="flex justify-between border-t border-sand-200 pt-3 font-semibold">
                <span>Total</span>
                <span>₹{offer.subtotalInr}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-sand-600">
              Shipping is configured server-side. Add your shipping policy later (free above ₹X, flat fee under ₹X, etc.).
            </p>
          </div>

          <div className="card p-6 md:p-8">
            <h2 className="text-lg font-semibold">Trust</h2>
            <ul className="mt-3 space-y-2 text-sm text-sand-700">
              <li>• Secure payments (UPI / Cards / Netbanking)</li>
              <li>• Order saved instantly after payment</li>
              <li>• Add WhatsApp confirmation in the next step</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
