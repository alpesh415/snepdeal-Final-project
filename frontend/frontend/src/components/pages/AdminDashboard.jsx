import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://snepdeal-final-project-5.onrender.com";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/product/get`);

      if (!response.ok) {
        throw new Error("Products fetch failed");
      }

      const data = await response.json();

      const productList = Array.isArray(data)
        ? data
        : data.products || data.data || [];

      setProducts(productList);
    } catch (error) {
      console.error("Products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <h2>Total Products: {products.length}</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          {products.map((product) => (
            <div
              key={product._id || product.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h3>{product.name}</h3>

              <p>Price: ₹{product.price}</p>

              {product.category && (
                <p>
                  Category:{" "}
                  {typeof product.category === "object"
                    ? product.category.name
                    : product.category}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
