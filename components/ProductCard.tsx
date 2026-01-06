// 'use client';

// import Link from 'next/link';
// import { Star, ArrowRight, ShoppingCart, Smartphone, Shirt, Watch, Monitor, Zap } from 'lucide-react';

// function ProductCard({ product }: { product: any }) {
//   return (
//     <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      
//       {/* Image Area */}
//       <div className="relative h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
//         {product.tag && (
//           <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide z-10">
//             {product.tag}
//           </span>
//         )}
//         <span className="text-6xl">{product.image}</span>
        
//         {/* Quick Action Overlay (Hidden by default, visible on hover) */}
//         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//              <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:bg-indigo-50 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
//                Quick View
//              </button>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="p-4">
//         <div className="flex items-center gap-1 mb-1">
//           <Star className="h-4 w-4 text-yellow-400 fill-current" />
//           <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{product.rating} ({product.reviews})</span>
//         </div>
        
//         <Link href={`/product/${product.id}`}>
//           <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
//             {product.title}
//           </h3>
//         </Link>
        
//         <div className="flex items-center justify-between mt-3">
//           <span className="text-lg font-bold text-indigo-600">${product.price}</span>
//           <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
//             <ShoppingCart className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

'use client';
import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Plus } from 'lucide-react';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  // Calculate Discount Percentage
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-300 flex flex-col h-full">
      
      {/* 1. Image Area */}
      {/* Link points to /products (plural) to match your folder structure */}
      <Link href={`/products/${product.id}`} className="relative h-60 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors">
        <span className="text-7xl transform group-hover:scale-110 transition-transform duration-500">
            {product.image}
        </span>
        
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* 2. Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">
            {product.category}
        </span>
        
        {/* Title */}
        <Link href={`/products/${product.id}`} className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
          {product.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 dark:text-slate-700"}`} />
            ))}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
            ({product.reviews})
          </span>
        </div>

        {/* 3. Price & Action Section */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
             <span className="text-xs text-slate-400 line-through font-medium">
                ${product.originalPrice}
             </span>
             <span className="text-xl font-bold text-slate-900 dark:text-white">
                ${product.price}
             </span>
          </div>

          {/* Add to Cart Button (Matching your requested color style) */}
          <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-md shadow-indigo-200 dark:shadow-none">
             <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;