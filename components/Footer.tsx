"use client";

import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CreditCard 
} from 'lucide-react';
import Link from 'next/link'

const Footer = () => {
  return (
    // Matching the clean slate/white theme of your Navbar
    <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Section: Newsletter & Brand --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Description (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              SHOP<span className="text-indigo-600">HUB</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Your one-stop destination for the latest fashion, electronics, and lifestyle products. We deliver quality with a smile.
            </p>
            
            {/* Contact Info */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <span>123 Market Street, San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4 text-indigo-500" />
                <span>support@shophub.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="h-4 w-4 text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Grid (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Shop */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Shop</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Best Sellers</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Men's Fashion</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Women's Fashion</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Electronics</Link></li>
              </ul>
            </div>

            {/* Column 2: Customer Support */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Track Order</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Returns & Exchanges</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">FAQs</Link></li>
              </ul>
            </div>

            {/* Column 3: Newsletter Widget */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Stay Updated</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Subscribe for exclusive offers and deals.
              </p>
              <form className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Email address"
                  // 👇 ADD THIS LINE HERE
                  suppressHydrationWarning={true}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Copyright & Payments --- */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} ShopHub Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6">
            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Youtube className="h-5 w-5" /></Link>
          </div>

          {/* Payment Trust Signals (Visual mockup using text/icons) */}
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 text-slate-400 text-xs">
                <CreditCard className="h-4 w-4" />
                <span>Secure Payments</span>
             </div>
             {/* Payment Icons Mockup */}
             <div className="flex gap-2 opacity-70 grayscale hover:grayscale-0 transition-all">
                <div className="h-6 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-300">VISA</div>
                <div className="h-6 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-300">PAYPAL</div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;