import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/product";

const categories = [
  { key: "all", label: "All" },
  { key: "men's clothing", label: "Men" },
  { key: "women's clothing", label: "Women" },
  { key: "jewelery", label: "Jewelery" },
  { key: "electronics", label: "Electronics" },
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let items = products || [];
    if (activeCategory !== "all") {
      items = items.filter((p) => p.category === activeCategory);
    }
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, query]);

  if (!products || products.length === 0) {
    return (
      <div>
        <h1>Product List</h1>
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div>
      {/* <h1 style={{ textAlign: "center", marginBottom: 12 }}>Product List</h1> */}

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Search (e.g. shirt)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: 8,
              border: "1px solid #ddd",
              borderRadius: 6,
              width: 220,
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border:
                  activeCategory === c.key
                    ? "1px solid #111827"
                    : "1px solid #ddd",
                background: activeCategory === c.key ? "#111827" : "white",
                color: activeCategory === c.key ? "white" : "inherit",
                cursor: "pointer",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 6,
                cursor: "pointer",
                background: "white",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: 150, objectFit: "contain" }}
                />
              )}
              <h2 style={{ fontSize: 16 }}>{item.title}</h2>
              <p style={{ margin: "4px 0" }}>Price: ${item.price}</p>
              {item.rating && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 6,
                    color: "#374151",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#f59e0b"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                  </svg>
                  <span style={{ fontSize: 13 }}>{item.rating.rate}</span>
                  <span style={{ fontSize: 12, color: "#6b7280" }}>
                    ({item.rating.count})
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
