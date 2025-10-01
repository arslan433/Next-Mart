"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react';

export default function Header() {

  return (
    <header className=" top-0 z-50 bg-wite shadow-sm px-4 py-2">
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
        <div className="flex gap-5">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
        <div className="flex gap-5">
          <Link href={'/cart'}>
          <ShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
