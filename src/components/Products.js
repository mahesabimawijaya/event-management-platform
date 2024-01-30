import { products } from "./SearchBar";

export default function Handler(req, res) {
  if (req.method !== "GET") return res.status(404);

  const searchQuery = req.query.search || "";

  const filteredProducts = products.filter((product) => {
    product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return res.json(filteredProducts);
}
