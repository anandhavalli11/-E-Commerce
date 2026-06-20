import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Items:", items); // Debug
    setCart(items);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const products = cart.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));

      const res = await API.post(
        "/orders",
        {
          products,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 My Cart</h2>

      {/* Debug */}
      <p>Cart Length: {cart.length}</p>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.name}</h3>

              <img
                src={item.image}
                alt={item.name}
                width="150"
              />

              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>

              <button onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{totalAmount}</h3>

          <button
            onClick={placeOrder}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;