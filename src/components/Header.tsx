"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from "@/src/store/cartStore";
import SearchBar from './SearchBar';

export default function Header() {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum: any, item: any) => sum + item.quantity, 0);

  return (
    <header className="sticky bg-white/30 backdrop-blur-md top-0 z-50 shadow-sm px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="m">
          <Image
            src={'/logo.webp'}
            alt='logo'
            width={150}
            height={10}
          />
        </Link>
        <div className="flex gap-5 max-md:hidden">
          <Link href={"/"}>Home</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Contact</Link>
          <div className="pl-20"><SearchBar/> </div>

        </div>
        <div className="flex gap-5">
          <Link href="/cart" className="relative inline-block">
            <ShoppingCart className="w-7 h-7 text-slate-900" />

            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-2 bg-slate-900 text-white text-[10px] font-semibold 
                   rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
