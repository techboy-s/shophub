"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore(); // Import to clear cart after success

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) return;

  //   setIsLoading(true);

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Redirect to a success page after payment
  //       return_url: `${window.location.origin}/checkout/success`,
  //     },
  //   });

  //   // If we get here, it means there was an error (e.g. card declined)
  //   // If success, Stripe redirects automatically before this code runs.
  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message || "An unexpected error occurred.");
  //   } else {
  //     setMessage("An unexpected error occurred.");
  //   }

  //   setIsLoading(false);
  // };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    // --- SHOW THE REAL ERROR ON SCREEN ---
    console.log("Stripe Error Object:", error); // Log to console
    
    // This will print the exact reason (e.g., "Return URL invalid", "Authentication failed")
    setMessage(error.message || "An unknown error occurred");

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe injects the card inputs here */}
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      
      {message && <div className="text-red-500 text-sm font-medium">{message}</div>}

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}