"use client"; // This handles the interactive parts

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import { notFound } from 'next/navigation';

// Define the shape of the data this component expects
interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) return notFound();

  // Mocking original price logic
  const originalPrice = product.price * 1.2;
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left: Image */}
        <div className="relative h-96 md:h-[500px] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800">
           <Image 
             src={product.image} 
             alt={product.name}
             fill
             className="object-contain p-8"
             sizes="(max-width: 768px) 100vw, 50vw"
             priority
           />
           {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
              -{discount}% OFF
            </span>
           )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
             <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 dark:text-slate-700"}`} />
                ))}
             </div>
             <span className="text-slate-500">({product.reviews} reviews)</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-gray-100 dark:border-slate-800 my-6"></div>

          <div className="flex items-end gap-4 mb-8">
             <div>
               <p className="text-slate-400 line-through font-medium text-lg">
                 ${originalPrice.toFixed(2)}
               </p>
               <p className="text-4xl font-bold text-slate-900 dark:text-white">
                 ${product.price}
               </p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="w-full md:w-1/2">
                <AddToCartButton product={product} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}