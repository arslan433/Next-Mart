export const searchProducts = async (query) => {
  if (!query) return [];
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await res.json();
  return data.products;
};
