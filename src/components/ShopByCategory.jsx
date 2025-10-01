"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories } from "@/src/utils/fetchCategories";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((cat,i) => (
          <Link
            key={i}
            href={`/category/${cat.slug}`}
            className="group block rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <div className="h-40 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-lg sm:text-xl font-semibold text-slate-800 capitalize">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
