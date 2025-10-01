import ProductDetail from "@/src/components/ProductDetail";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return <ProductDetail product={product} />;
}
