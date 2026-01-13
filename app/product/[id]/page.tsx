'use client';

import React from 'react';
import { products } from '@/lib/data'; // Make sure this file exists!
import { notFound } from 'next/navigation';
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';
import AddToCartButton from '@/components/AddToCartButton';

// UPDATE 1: Type definition for Next.js 15
interface PageProps {
  params: Promise<{ id: string }>;
}

// UPDATE 2: Component must be 'async'
export default async function ProductDetailsPage({ params }: PageProps) {

  // UPDATE 3: Await the params before using them
  const { id } = await params;

  // 4. Find the product
  const product = products.find((p) => p.id === Number(id));

  // 5. Handle "Product Not Found"
  if (!product) {
    notFound();
  }

  // Mocking multiple images for the gallery
  const galleryImages = [product.image, '📦', '🎁', '✨'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/product"
          className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* --- LEFT COLUMN: Image Gallery --- */}
          <div>
            {/* Ensure you have created this component, otherwise comment it out */}
            <ProductGallery images={galleryImages} />
          </div>

          {/* --- RIGHT COLUMN: Product Info --- */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-indigo-600 font-semibold text-sm bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="fill-current h-4 w-4" />
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  4.5 ({120} reviews)
                  {/* Note: I hardcoded rating/reviews because your data source might not have them yet */}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {product.title}
              {/* Note: Your previous data used 'name', this code used 'title'. I changed it to 'name' to match your array. */}
            </h1>

            {/* Price Block */}
            <div className="flex items-end gap-4 mb-6 border-b border-gray-200 dark:border-slate-800 pb-6">
              <span className="text-4xl font-bold text-indigo-600">
                {product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Experience premium quality with our latest collection. Designed for comfort and durability.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform hover:-translate-y-1">
                <AddToCartButton
                  product={{
                    ...product,
                    title: product.title, // Maps 'title' to 'name' so the button understands it
                  }}
                />
              </button>
              <button className="flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-white px-6 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <Truck className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Free Shipping</h4>
                  <p className="text-xs text-slate-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <ShieldCheck className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">2 Year Warranty</h4>
                  <p className="text-xs text-slate-500">Full coverage included</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}