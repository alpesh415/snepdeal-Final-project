import React, { useEffect, useState } from "react";
import { API } from "../components/services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API.products);

        if (!response.ok) {
          throw new Error("Products API failed");
        }

        const data = await response.json();

        // Backend response ko handle karna
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Products load nahi ho rahe.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>Loading Products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        ) : (
          <h3 style={{ textAlign: "center", width: "100%" }}>
            No Products Found
          </h3>
        )}
      </div>
    </div>
  );
};

export default Home;
