import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiShoppingBag } from "react-icons/fi";

function readCartCount() {
  try {
    const raw = localStorage.getItem("cart");
    const cart = raw ? JSON.parse(raw) : {};
    return Object.values(cart).reduce((s, v) => s + v, 0);
  } catch {
    return 0;
  }
}

const HeaderPage = () => {
  const [count, setCount] = useState(() => readCartCount());

  useEffect(() => {
    const onUpdate = (e) => {
      if (e && e.detail && e.detail.cart) {
        setCount(Object.values(e.detail.cart).reduce((s, v) => s + v, 0));
      } else {
        setCount(readCartCount());
      }
    };

    const onStorage = (e) => {
      if (e.key === "cart") setCount(readCartCount());
    };

    window.addEventListener("cart-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("cart-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: 48, height: 48 }} />
          <h1 style={{ margin: 0, fontSize: 18 }}>FakeStore</h1>
        </Link>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <Link
          to="/cart"
          aria-label="View cart"
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
        <FiShoppingBag />
          {count > 0 && (
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                background: "#ef4444",
                color: "white",
                borderRadius: "50%",
                padding: "1px 4px",
                fontSize: 6,
              }}
            >
              {count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default HeaderPage;
