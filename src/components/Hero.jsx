"use client";



import { motion } from "framer-motion";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('./bg.webp')",
      }}
    >
      <div className="bg-black/30 absolute inset-0" /> {/* overlay for readability */}

      <div className="relative container mx-auto px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Summer Collection 2025
          </h1>
          <p className="text-lg mb-8">
            Discover our latest arrivals designed for comfort and style. Premium
            quality that lasts.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Button */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <Link
                href="/products"
                className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700"
              >
                Shop Now
              </Link>
            </motion.div>
            <Link
              href="#"
              className="mt-6 inline-block bg-gray-400  px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-gray-500/10"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Right side empty for spacing */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  );
}
