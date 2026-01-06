"use client"; // 👈 This makes it a Client Component

import React, { useState } from 'react';

// Interface for props
interface GalleryProps {
  images: string[]; // Array of image URLs/Emojis
}

const ProductGallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="aspect-square bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 flex items-center justify-center p-8 shadow-sm">
        <span className="text-9xl transform transition-transform duration-500 hover:scale-110">
          {selectedImage}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`aspect-square rounded-lg border-2 flex items-center justify-center text-2xl bg-white dark:bg-slate-900 transition-all ${
              selectedImage === img
                ? 'border-indigo-600 shadow-md ring-2 ring-indigo-100' // Active State
                : 'border-gray-100 dark:border-slate-800 hover:border-indigo-300'
            }`}
          >
            {img}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;