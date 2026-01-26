"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm"; 
import { Loader2 } from "lucide-react";

// Load Stripe outside of component render to avoid recreating it
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (items.length > 0) {
      // Create PaymentIntent as soon as page loads
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-xl font-medium text-slate-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Order Summary */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 h-fit">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Order Summary</h2>
          <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                   <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                  <p className="text-sm text-slate-500">${item.price} x {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 dark:border-slate-800 pt-4 flex justify-between items-center">
            <span className="font-medium text-slate-600 dark:text-slate-400">Total</span>
            <span className="text-2xl font-bold text-indigo-600">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Payment Details</h2>
          
          {clientSecret ? (
            <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="flex justify-center py-12">
               <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}