import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Product added to cart");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🛍️ Our Products
      </h1>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No matching products found.</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                padding: "20px",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                  marginBottom: "15px",
                }}
              />

              <h2>{product.name}</h2>

              <p style={{ color: "#555" }}>{product.description}</p>

              <h3 style={{ color: "#28a745" }}>
                ₹{product.price}
              </h3>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              <button
                onClick={() => addToCart(product)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;