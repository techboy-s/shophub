"use client"

import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  User, 
  ChevronDown,
  LogOut 
} from 'lucide-react';
import Link from 'next/link'
import CartBadge from './CartBadge';
import { useSession, signOut } from "@/lib/auth-client"; // Import signOut
import { useRouter } from 'next/navigation'; // Import router for redirect

const NavbarColored = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // 1. GET THE SESSION DATA
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    // changed bg-white to bg-indigo-600
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/80 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Main Navbar Row --- */}
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Logo */}
          <Link href="/">
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            {/* Added a subtle white glow effect on hover */}
            <span className="font-extrabold text-2xl tracking-tighter text-white transition-transform group-hover:scale-105">
              SHOP<span className="text-yellow-300">HUB</span>
            </span>
          </div>
          </Link>

          {/* 2. Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl px-6">
            <div className="relative w-full group">
              {/* Input kept white for maximum contrast against the blue background */}
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                 suppressHydrationWarning={true}
                className="w-full bg-white text-slate-800 border-none rounded-full py-2.5 pl-10 pr-12 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 shadow-sm transition-all duration-200"
              />
              
              <Search className="absolute left-3.5 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <button className="absolute right-2 top-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* 3. Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-indigo-100 hover:text-white transition-colors">Home</Link>
            
            {/* Dropdown Trigger */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-sm font-medium text-indigo-100 group-hover:text-white transition-colors">
                Categories <ChevronDown className="h-4 w-4" />
              </div>
              
              {/* Dropdown Menu (Kept white for readability) */}
              <div className="absolute top-full right-0 w-56 bg-white rounded-xl mt-4 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-xl border border-indigo-100">
                {/* Little triangle pointer */}
                <div className="absolute -top-2 right-12 w-4 h-4 bg-white transform rotate-45 border-l border-t border-indigo-100"></div>
                
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Categories</div>
                <Link href="#" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Electronics & Gadgets</Link>
                <Link href="#" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Fashion & Apparel</Link>
                <Link href="#" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Home & Living</Link>
              </div>
            </div>

            <Link href="http://localhost:3000/admin/products/new" className="text-sm font-medium text-indigo-100 hover:text-white transition-colors">Admin</Link>
          </div>

          {/* 4. Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* --- USER AUTH SECTION (MODIFIED) --- */}
            {session ? (
              // IF LOGGED IN: Show Avatar & Name + Click to Logout
              <button 
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-3 pl-2 border-l border-indigo-500 ml-2 group hover:bg-indigo-500/20 rounded-lg p-1 transition-all"
                title="Click to Logout"
              >
                 <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-indigo-200 shadow-sm relative">
                    <img 
                      src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`} 
                      alt={session.user.name || "User"}
                      className="object-cover w-full h-full"
                    />
                 </div>
                 <div className="hidden md:flex flex-col items-start">
                   <span className="text-sm font-bold text-white leading-none mb-0.5 max-w-[100px] truncate">
                     {session.user.name}
                   </span>
                   <span className="flex items-center gap-1 text-[10px] text-indigo-200 uppercase tracking-wide">
                     Logout <LogOut className="h-3 w-3" />
                   </span>
                 </div>
              </button>
            ) : (
              // IF LOGGED OUT: Show Login Button
              <Link 
                href="/login"
                className="hidden sm:flex items-center gap-2 text-indigo-100 hover:text-white hover:bg-indigo-500/50 px-3 py-2 rounded-lg transition-all"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}

            <div className="h-6 w-px bg-indigo-500 hidden sm:block"></div>

            {/* Wishlist */}
            <button className="text-indigo-100 hover:text-white hover:bg-indigo-500/50 p-2 rounded-full transition-all">
              <span className="sr-only">Wishlist</span>
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart with Yellow Badge */}
           <CartBadge/>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center ml-2">
              <button onClick={toggleMenu} className="text-white focus:outline-none p-1">
                {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Search Bar (White version) --- */}
        <div className="pb-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              suppressHydrationWarning={true}
              className="w-full bg-indigo-700 text-white placeholder-indigo-300 border border-transparent focus:border-indigo-400 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-indigo-300" />
          </div>
        </div>
      </div>

      {/* --- Mobile Dropdown Menu (Slide down) --- */}
      <div 
        className={`lg:hidden bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          <Link href="/" className="flex items-center justify-between py-2 text-base font-medium text-slate-700 border-b border-gray-100">
            Home
          </Link>
          <Link href="#" className="flex items-center justify-between py-2 text-base font-medium text-slate-700 border-b border-gray-100">
            Categories <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="#" className="flex items-center justify-between py-2 text-base font-medium text-slate-700 border-b border-gray-100">
            Deals & Offers
          </Link>

          <div className="grid grid-cols-1 gap-4 pt-4">
             <button className="flex items-center justify-center gap-2 w-full border border-indigo-600 text-indigo-600 py-2.5 rounded-lg font-semibold hover:bg-indigo-50">
                <Heart className="h-4 w-4" /> Wishlist
             </button>

             {/* --- MOBILE AUTH SECTION --- */}
             {session ? (
               <div className="space-y-3">
                 <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-indigo-200">
                       <img
                          src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} 
                          alt="User"
                          width={40}
                          height={40}
                       />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-slate-800">{session.user.name}</p>
                       <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                    </div>
                 </div>
                 {/* Logout Button (Same style as Login was) */}
                 <button 
                   onClick={handleLogout}
                   className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 shadow-md transition-all"
                 >
                   <LogOut className="h-4 w-4" /> Logout
                 </button>
               </div>
             ) : (
               <Link href="/login" className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 shadow-md">
                 <User className="h-4 w-4" /> Login
               </Link>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarColored;