'use client';

// This page handles URLs like /product/123 or /product/iphone-15
export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch product data using params.id
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fake Image Placeholder */}
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
          <span className="text-slate-400">Product Image</span>
        </div>
        
        {/* Product Info */}
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
             Product ID: {params.id}
           </h1>
           <p className="mt-4 text-slate-600 dark:text-slate-400">
             This is the description for the product.
           </p>
           <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
             Add to Cart
           </button>
        </div>
      </div>
    </div>
  );
}