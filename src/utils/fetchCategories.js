export async function fetchCategories() {
  const res = await fetch('https://dummyjson.com/products/categories');
  const categories = await res.json();
  return categories.slice(0, 8); 
}
