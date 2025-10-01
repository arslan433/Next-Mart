export default async function ProductDetail({ params }) {
  const { id } = params;

  // Abhi ke liye DummyJSON se fetch kar rahe hain
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
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
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* More Images */}
      {product.images?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">More Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} ${index}`}
                className="rounded-lg shadow"
              />
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
