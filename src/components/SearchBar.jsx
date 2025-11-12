"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { searchProducts } from "@/src/utils/searchProducts";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true);
        const data = await searchProducts(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && activeIndex >= 0) {
        router.push(`/product/${results[activeIndex].id}`);
        setResults([]);
        setQuery("");
      }
    },
    [activeIndex, results, router]
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full  pl-10 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <svg
          className="absolute left-3 top-1 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        </svg>
      </div>

      {/* Loading indicator */}
      {loading && (
        <p className="text-sm text-gray-400 mt-2 animate-pulse">Searching...</p>
      )}

      {/* Results dropdown */}
      <AnimatePresence>
        {results.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white border rounded-xl shadow-lg mt-2 max-h-64 overflow-y-auto z-50"
          >
            {results.map((item, i) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push(`/product/${item.id}`);
                  setResults([]);
                  setQuery("");
                }}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all ${
                  activeIndex === i ? "bg-indigo-100" : "hover:bg-gray-50"
                }`}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">${item.price}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
