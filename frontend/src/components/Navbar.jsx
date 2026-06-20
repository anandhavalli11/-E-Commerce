import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#fff" }}>🛒 E-Commerce</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          Products
        </Link>

        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart
        </Link>

        <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
          Orders
        </Link>

        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>

        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;