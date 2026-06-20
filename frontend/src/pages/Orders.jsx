import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load orders");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>

            <h4>Products:</h4>

            <ul>
              {order.products.map((item, index) => (
                <li key={index} style={{ marginBottom: "15px" }}>
                  <h4>{item.product.name}</h4>

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    width="120"
                  />

                  <p>Price: ₹{item.product.price}</p>

                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;