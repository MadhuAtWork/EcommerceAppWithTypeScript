import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./ReduxComponent/store";
import { fetchProducts } from "./ReduxComponent/slices/productsSlice";
import ProductCard from "./ProductCard";
import useDebounce from "./customeHooks/useDebounce";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load products</p>;

  return (
    <div className="container mt-3">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
      />
      <div className="row g-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
