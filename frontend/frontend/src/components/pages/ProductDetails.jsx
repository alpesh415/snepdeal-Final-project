import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../components/services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API.productById(id));

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        const productData = data.product || data.data || data;

        setProduct(productData);
      } catch (err) {
        console.error("Product details error:", err);
        setError("Product details load nahi ho rahe.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>Loading Product...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>{error || "Product not found"}</h3>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={
            product.image ||
            product.imageUrl ||
            product.images?.[0] ||
            "https://via.placeholder.com/400"
          }
          alt={product.name}
          style={{ maxWidth: "400px", width: "100%" }}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        {product.category && (
          <p>
            <strong>Category:</strong>{" "}
            {typeof product.category === "object"
              ? product.category.name
              : product.category}
          </p>
        )}

        <h2>₹{product.price}</h2>

        {product.description && <p>{product.description}</p>}

        {product.stock !== undefined && (
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
        )}

        <button>Add to Cart</button>
        <button>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default ProductDetails;
