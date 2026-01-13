"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

// UPDATE: Changed price from string to number to match your data
interface Product {
  id: number;
  title: string; // Ensure your data uses 'name' (or change this to 'title' if your data uses title)
  price: number; 
  category: string;
  image: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // UPDATE: No need to parse string anymore, just use the number directly
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      quantity: 1,
    });
    
    alert("Added to cart!");
  };

  return (
    <button 
      onClick={handleAddToCart}
      suppressHydrationWarning={true}
      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
    >
      <ShoppingCart className="h-5 w-5" />
      Add to Cart
    </button>
  );
}