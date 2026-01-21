
// 'use client';

// import React from 'react';
// import ProductCard from '@/components/ProductCard';
// import FilterSidebar from '@/components/FilterSidebar';
// import { products } from '@/lib/data';

// export default function ProductListingPage() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
//       {/* Breadcrumb / Title */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
//         <p className="text-slate-500 text-sm">{products.length} results found</p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
        
//         {/* 1. Sidebar (Hidden on Mobile, Visible on Desktop) */}
//         <aside className="hidden lg:block w-64 flex-shrink-0">
//           <FilterSidebar />
//         </aside>

//         {/* 2. Main Product Grid */}
//         <main className="flex-1">
//           {/* Mobile Filter Toggle (Visual Only for Day 2) */}
//           <div className="lg:hidden mb-4">
//              <button className="w-full border border-gray-300 bg-white py-2 rounded-lg text-sm font-medium text-slate-700">
//                Show Filters
//              </button>
//           </div>

//           {/* The Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { prisma } from '@/lib/prisma'; // 1. Import real DB connection

// 2. Fetch data directly on the server
// async function getProducts() {
//   const products = await prisma.product.findMany({
//     orderBy: {
//       createdAt: 'desc', // Optional: Show newest first
//     },
//   });
//   return products;

// }

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    // LOG THE RESULT TO YOUR VS CODE TERMINAL
    // console.log("✅ Fetched Products:", products); 
    
    return products;
  } catch (error) {
    console.error("❌ DB Error:", error);
    return []; // Return empty array so page doesn't crash
  }
}

// 3. Component must be 'async' to await data
export default async function ProductListingPage() {
  const products = await getProducts(); // Fetch the real data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb / Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
        <p className="text-slate-500 text-sm">{products.length} results found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 1. Sidebar (Hidden on Mobile, Visible on Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* 2. Main Product Grid */}
        <main className="flex-1">
          {/* Mobile Filter Toggle (Visual Only for Day 2) */}
          <div className="lg:hidden mb-4">
             <button className="w-full border border-gray-300 bg-white py-2 rounded-lg text-sm font-medium text-slate-700">
               Show Filters
             </button>
          </div>

          {/* The Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              // We assume ProductCard can handle the product object shape
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}