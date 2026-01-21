// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { Star, ShoppingCart, Plus } from 'lucide-react';
// import AddToCartButton from './AddToCartButton';

// interface ProductProps {
//   id: number;
//   title: string;
//   price: number;
//   originalPrice: number;
//   rating: number;
//   reviews: number;
//   image: string;
//   category: string;
// }

// const ProductCard = ({ product }: { product: ProductProps }) => {
//   // Calculate Discount Percentage
//   const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//   return (
//     <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-300 flex flex-col h-full">
      
//       {/* 1. Image Area */}
//       {/* Link points to /products (plural) to match your folder structure */}
//       <Link href={`/products/${product.id}`} className="relative h-60 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors">
//         <span className="text-7xl transform group-hover:scale-110 transition-transform duration-500">
//             {product.image}
//         </span>
        
//         {/* Discount Badge */}
//         {discount > 0 && (
//           <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
//             {discount}% OFF
//           </span>
//         )}
//       </Link>

//       {/* 2. Content Area */}
//       <div className="p-5 flex flex-col flex-grow">
//         {/* Category */}
//         <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">
//             {product.category}
//         </span>
        
//         {/* Title */}
//         <Link href={`/products/${product.id}`} className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
//           {product.title}
//         </Link>

//         {/* Rating */}
//         <div className="flex items-center mb-4">
//           <div className="flex text-amber-400">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200 dark:text-slate-700"}`} />
//             ))}
//           </div>
//           <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
//             ({product.reviews})
//           </span>
//         </div>

//         {/* 3. Price & Action Section */}
//         <div className="mt-auto flex items-center justify-between gap-4">
//           <div className="flex flex-col">
//              <span className="text-xs text-slate-400 line-through font-medium">
//                 ${product.originalPrice}
//              </span>
//              <span className="text-xl font-bold text-slate-900 dark:text-white">
//                 ${product.price}
//              </span>
//           </div>

//           {/* Add to Cart Button (Matching your requested color style) */}
//           <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-md shadow-indigo-200 dark:shadow-none">
//              <Plus className="h-4 w-4" /> 
//              <AddToCartButton product={product} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

'use client';
import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

// Updated Interface to match your Prisma DB Model
interface ProductProps {
  id: number;
  name: string; // DB uses 'name', not 'title'
  description?: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  // originalPrice is not in your DB schema yet, so we make it optional or calculate it
  originalPrice?: number; 
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  // Mocking original price if missing (to show the discount logic)
  const originalPrice = product.originalPrice || product.price * 1.2;
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-300 flex flex-col h-full">
      
      {/* 1. Image Area - UPDATED to use <img> tag */}
      <Link href={`/product/${product.id}`} className="relative h-60 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden group-hover:bg-slate-100 transition-colors">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        
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
        
        {/* Title - Mapped 'name' to UI */}
        <Link href={`/product/${product.id}`} className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
          {product.name}
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
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                ${product.price}
              </span>
          </div>

          {/* Add to Cart Button - Fixed Nesting */}
          {/* We pass the props mapping 'name' back to 'title' if AddToCart expects title, or just 'name' if updated */}
          <div className="shadow-md shadow-indigo-200 dark:shadow-none rounded-lg">
             <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;