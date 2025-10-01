"use client";
import { useEffect, useState } from 'react';
import ProductCard from '@/src/components/ProductCard';
import ShopByCategory from '@/src/components/ShopByCategory';
import { motion } from "framer-motion";
import { fetchProducts } from '@/src/utils/fetchProducts';
import Link from "next/link";



export default function Hero() {

 const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('./bg.webp')",
        }}
      >
        <div className="bg-black/10 absolute inset-0" /> {/* overlay for readability */}

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
                  href="/product"
                  className="mt-6 inline-block bg-slate-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-slate-700"
                >
                  Shop Now
                </Link>
              </motion.div>
              <Link
                href="#"
                className="mt-6 inline-block bg-gray-500/10 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-gray-500/15"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* Right side empty for spacing */}
          <div className="hidden md:block"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 capitalize text-center">
               Featured Products
            </h1>

            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mx-2">
                    {products.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            originalPrice={Math.round(item.price / (1 - item.discountPercentage / 100))}
                            discount={item.discountPercentage}
                            rating={item.rating}
                            image={item.thumbnail}
                        />
                    ))}
                </div>
            )}
        </section>
      <section>
        <ShopByCategory/>
      </section>
    </>
  );
}
