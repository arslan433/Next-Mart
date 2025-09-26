"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="ml-4">
         <Image 
         src={'/logo.webp'}
         alt= 'logo'
         width={150}
         height={10}
         />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-gray-900 font-medium hover:text-primary">
            Home
          </Link>

          {/* Shop Dropdown (Click Toggle) */}
          <div className="relative">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center text-gray-900 font-medium hover:text-primary"
            >
              Shop <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {shopOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded">
                {["Women", "Men", "Accessories", "Footwear"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="#" className="text-gray-900 font-medium hover:text-primary">
            New Arrivals
          </Link>
          <Link href="#" className="text-gray-900 font-medium hover:text-primary">
            Sale
          </Link>
          <Link href="#" className="text-gray-900 font-medium hover:text-primary">
            About
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Toggle */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-primary"
            >
              <Search className="w-6 h-6" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Account */}
          <button className="text-gray-700 hover:text-primary">
            <User className="w-6 h-6" />
          </button>

          {/* Cart */}
          <button className="relative text-gray-700 hover:text-primary">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link href="/" className="block py-2 text-gray-900 font-medium">
              Home
            </Link>
            <div>
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center justify-between w-full py-2 text-gray-900 font-medium"
              >
                Shop <ChevronDown className="w-4 h-4" />
              </button>
              {shopOpen && (
                <div className="pl-4 space-y-2 mt-1">
                  {["Women", "Men", "Accessories", "Footwear"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block py-1 text-gray-700"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="#" className="block py-2 text-gray-900 font-medium">
              New Arrivals
            </Link>
            <Link href="#" className="block py-2 text-gray-900 font-medium">
              Sale
            </Link>
            <Link href="#" className="block py-2 text-gray-900 font-medium">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
