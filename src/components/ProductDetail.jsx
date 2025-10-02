"use client";
import { useState } from "react";
import ImageMagnifier from "@/src/components/ImageMagnifier";
import { useCartStore } from "@/src/store/cartStore";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const addToCart = useCartStore((state) => state.addToCart);

  const { setBuyNow } = useCartStore();
  const router = useRouter();

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
            <button
              onClick={() => {
                addToCart(product); // sirf ek product set hoga
                router.push("/checkout");
              }}
              className="bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700"
            >
              Buy Now
            </button>
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
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Customer Reviews</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-100 to-slate-300 rounded-2xl shadow-lg p-6 text- transform hover:scale-[1.02] transition duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar with initials */}
                    <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center font-bold text-white shadow-md">
                      {review.reviewerName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{review.reviewerName}</p>
                      <span className="text-xs text-slate-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <blockquote className="italic leading-relaxed">
                  "{review.comment}"
                </blockquote>
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
