export async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products.slice(8, 12);
  // .sort((a, b) => b.rating - a.rating)
  //   .slice(0, 4);
}
export async function fetchAllProducts() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products
}
