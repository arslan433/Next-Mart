"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from "@/src/store/cartStore";

export default function Header() {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum: any, item: any) => sum + item.quantity, 0);

  return (
    <header className="sticky bg-white/30 backdrop-blur-md top-0 z-50 shadow-sm px-4 py-2">
      <div className="container mx-auto flex items-center justify-between fi">
        {/* Logo */}
        <Link href="/" className="m">
          <Image
            src={'/logo.webp'}
            alt='logo'
            width={150}
            height={10}
          />
        </Link>
        <div className="flex gap-5">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
        <div className="flex gap-5">
          <Link href={'/cart'}>
            <div className="absolute right-[12px] top-[15px] bg-slate-900 text-white rounded-full h-4 w-4 text-center flex justify-center">
              <span className="text-xs">
              {totalItems}</span></div>
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
