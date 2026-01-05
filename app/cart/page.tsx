"use client";
export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Your Shopping Cart
      </h1>
      <div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500">Your cart is currently empty.</p>
      </div>
    </div>
  );
}