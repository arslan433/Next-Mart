import ProductCard from "@/src/components/ProductCard";

export default async function AllProducts() {

    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    const products = data.products;

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 capitalize">
               All Products
            </h1>

            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols- lg:grid-cols-4 gap-4 justify-items-center mx-2">
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
    );
}
