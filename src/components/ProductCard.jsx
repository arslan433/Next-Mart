"use client";
import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore"; 

export default function ProductCard({ id, title, price, originalPrice, discount, rating, image }) {
  const addToCart = useCartStore((state) => state.addToCart); 

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price: Number(price), 
      image,
    });
  };

  return (
    <div className="relative m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      {/* Product Image */}
      <Link
        className="relative mx-3 mt-3 flex h-60 max-md:h-[60%] overflow-hidden rounded-xl"
        href={`/product/${id}`}
      >
        <img className="object-cover w-full" src={image} alt={title} />
        {discount && (
          <span className="absolute top-0 left-0 m-2 pt-[1px] rounded-full bg-black px-2 text-sm font-medium text-white">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>

        {/* Price + Rating */}
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="grid">
            <span className="font-bold text-slate-900 text-[clamp(1.1rem,4vw,1.3rem)]">
              ${Number(price).toFixed(2)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-slate-900 line-through">
                ${Number(originalPrice).toFixed(2)}
              </span>
            )}
          </p>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`h-5 w-5 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 
                  3.292a1 1 0 00.95.69h3.462c.969 0 
                  1.371 1.24.588 1.81l-2.8 2.034a1 1 
                  0 00-.364 1.118l1.07 3.292c.3.921-.755 
                  1.688-1.54 1.118l-2.8-2.034a1 1 
                  0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                  1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
                  1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 rounded bg-yellow-200 px-2 py-0.5 pt-[3px] text-xs tracking-tight font-semibold">
              {rating}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart} 
          className="flex items-center w-full justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 
              13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 
              1.707.707 1.707H17m0 0a2 2 0 
              100 4 2 2 0 000-4zm-8 2a2 2 0 
              11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
}
