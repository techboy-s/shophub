"use client";

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartBadge() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Calculate the dynamic count
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default state before loading (No badge to prevent errors)
  if (!mounted) {
    return (
      <Link 
        href="/cart" 
        className="relative text-indigo-100 hover:text-white hover:bg-indigo-500/50 p-2 rounded-full transition-all group"
      >
        <span className="sr-only">Cart</span>
        <ShoppingBag className="h-6 w-6" />
      </Link>
    );
  }

  return (
    <Link 
      href="/cart" 
      className="relative text-indigo-100 hover:text-white hover:bg-indigo-500/50 p-2 rounded-full transition-all group"
    >
      <span className="sr-only">Cart</span>
      <ShoppingBag className="h-6 w-6 group-hover:animate-bounce-short" /> 
      
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center ring-2 ring-indigo-600 transform scale-100 group-hover:scale-110 transition-transform">
          {cartCount}
        </span>
      )}
    </Link>
  );
}