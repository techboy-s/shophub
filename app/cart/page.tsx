"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  
  // Need to handle hydration mismatch for persisting data (optional fix for advanced users, 
  // but basic rendering works fine for now). 

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mb-6">
          <ShoppingBag className="h-16 w-16 text-indigo-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            href="/product"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: Cart Items List --- */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 flex gap-4 transition-all hover:shadow-sm"
              >
                {/* Image */}
                <div className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                   {/* Using standard img tag for simplicity, or Next Image if configured */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:text-indigo-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:text-indigo-600"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price Calculation */}
                    <div className="text-right">
                       <p className="font-bold text-lg text-slate-900 dark:text-white">
                         ${(item.price * item.quantity).toLocaleString()}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- RIGHT: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-800 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tax (Estimated)</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-slate-800 my-4"></div>
                <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>${(total + (total * 0.08)).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2">
                Checkout Now <ArrowRight className="h-5 w-5" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                <ShieldCheckIcon className="h-4 w-4" />
                Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Small helper icon component
function ShieldCheckIcon({className}: {className: string}) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}