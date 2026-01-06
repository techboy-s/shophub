'use client';
import Link from 'next/link';
import { ArrowRight, Smartphone, Shirt, Watch, Monitor, Zap } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

// --- Mock Data (In a real app, this comes from your Database) ---
const categories = [
  { name: 'Mobiles', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { name: 'Fashion', icon: Shirt, color: 'bg-pink-100 text-pink-600' },
  { name: 'Electronics', icon: Monitor, color: 'bg-purple-100 text-purple-600' },
  { name: 'Watches', icon: Watch, color: 'bg-orange-100 text-orange-600' },
  { name: 'Deals', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
];

// const products = [
//   { id: 1, title: 'Wireless Noise Cancelling Headphones', price: 299, rating: 4.8, reviews: 120, image: '🎧', tag: 'Best Seller' },
//   { id: 2, title: 'Smart Fitness Watch Series 7', price: 199, rating: 4.5, reviews: 85, image: '⌚', tag: 'Sale' },
//   { id: 3, title: 'Ergonomic Mechanical Keyboard', price: 120, rating: 4.9, reviews: 230, image: '⌨️', tag: null },
//   { id: 4, title: '4K Ultra HD Action Camera', price: 349, rating: 4.6, reviews: 50, image: '📷', tag: 'New' },
// ];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Hero Section (Banner) */}
      <div className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="bg-indigo-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
             {/* Decorative Circles */}
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-600 rounded-full opacity-50 blur-3xl"></div>

             {/* Content */}
             <div className="relative z-10 text-center md:text-left mb-8 md:mb-0 max-w-lg">
                <span className="inline-block py-1 px-3 rounded-full bg-yellow-400 text-indigo-900 text-xs font-bold mb-4 uppercase tracking-wider">
                  Season Sale
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Up to 50% Off on <br/> Latest Tech
                </h1>
                <p className="text-indigo-100 mb-8 text-lg">
                  Upgrade your gear with our exclusive summer collection. Limited time offer.
                </p>
                <Link href="/products" className="inline-flex items-center bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-lg">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
             </div>

             {/* Hero Image Placeholder */}
             <div className="relative z-10 w-full md:w-1/2 flex justify-center">
                {/* Replace this div with a real <Image /> tag later */}
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-6xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                  🛍️
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Category Strip (Flipkart Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat, idx) => (
            <Link key={idx} href={`/category/${cat.name.toLowerCase()}`} className="group min-w-[100px] flex flex-col items-center gap-3 cursor-pointer">
              <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Featured Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trending Products</h2>
          <Link href="/products" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 4. Promo Banner (Mid-page) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
           <div>
             <h3 className="text-2xl font-bold text-white mb-2">Join ShopHub Prime</h3>
             <p className="text-slate-400">Get free delivery and exclusive access to new products.</p>
           </div>
           <button className="mt-6 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
             Join Membership
           </button>
        </div>
      </div>

      {/* 5. "Recommended for You" Section (Reusing logic) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).reverse().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}
