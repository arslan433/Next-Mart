"use client";
import { useState } from "react";
import ImageMagnifier from "@/src/components/ImageMagnifier";
import { useCartStore } from "@/src/store/cartStore";

export default function ProductDetail({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const addToCart = useCartStore((state) => state.addToCart);


  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div className="flex justify-center">
          <ImageMagnifier src={activeImage} alt={product.title} zoom={2.5} />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Price + Discount */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="line-through text-gray-400">
                  ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                </span>
                <span className="text-red-500 font-semibold">
                  -{product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Stock + Rating */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-yellow-500">⭐ {product.rating}</span>
            <span className="text-gray-500">({product.stock} in stock)</span>
          </div>

          {/* Extra Info */}
          <ul className="text-sm text-gray-700 space-y-1 mb-6">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>SKU:</strong> {product.sku}</li>
            <li><strong>Weight:</strong> {product.weight}g</li>
            <li><strong>Dimensions:</strong> {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</li>
            <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
            <li><strong>Shipping:</strong> {product.shippingInformation}</li>
            <li><strong>Availability:</strong> {product.availabilityStatus}</li>
            <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
            <li><strong>Min Order Qty:</strong> {product.minimumOrderQuantity}</li>
          </ul>

          {/* Add to Cart */}
          <div className="flex gap-4">

            <button onClick={() => addToCart(product)}
               className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
              >
              Add to Cart
            </button>
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
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
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* More Images */}
      {product.images?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">More Images</h2>
          <div className="flex grid-cols-2 sm:grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`rounded-lg overflow-hidden border-2 transition w-32 
                ${activeImage === img ? "border-gray-500/50" : "border-transparent"}`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index}`}
                  className="w object-cover hover:scale-105 transition-transform duration-300"

                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <span className="text-yellow-500">⭐ {review.rating}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <span className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code */}
      {product.meta?.qrCode && (
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Scan for More Info</h2>
          <img
            src={product.meta.qrCode}
            alt="QR Code"
            className="mx-auto w-32 h-32"
          />
        </div>
      )}
    </section>
  );
}
