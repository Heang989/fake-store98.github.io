import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/product";

const ProductDetail = () => {
  const { id } = useParams();
  const pid = parseInt(id, 10);
  const product = products.find((p) => p.id === pid);

  const [qty, setQty] = useState(1);
  const [confirm, setConfirm] = useState("");

  if (!product) return <div className="p-6 text-center text-gray-600">Product not found.</div>;

  const addToCart = () => {
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : {};
      const current = cart[product.id] || 0;
      cart[product.id] = current + qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart } }));
      setConfirm(`${qty} item${qty > 1 ? "s" : ""} added to cart`);
      setTimeout(() => setConfirm(""), 2500);
    } catch {
      setConfirm("Could not add to cart");
      setTimeout(() => setConfirm(""), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white p-6 rounded-2xl shadow-lg">
        
        {/* 🖼 Product Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl border overflow-hidden group">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* 🧾 Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-snug">
            {product.title}
          </h1>

          <div className="text-2xl font-bold text-green-600 mb-4">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 items-center mb-6">
            <div className="text-sm text-gray-700">
              <strong className="mr-1">Category:</strong>
              <span className="text-gray-600 capitalize">{product.category}</span>
            </div>

            {product.rating && (
              <div className="flex items-center gap-2 text-sm">
                <strong className="mr-1">Rating:</strong>
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                  </svg>
                  <span className="font-medium text-gray-800">
                    {product.rating.rate.toFixed(1)}
                  </span>
                  <span className="text-gray-500">({product.rating.count})</span>
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-wrap items-center gap-5 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 border rounded-full flex items-center justify-center text-lg font-semibold hover:bg-gray-100 cursor-pointer"
              >
                −
              </button>
              <div className="w-12 h-10 border rounded flex items-center justify-center text-lg font-medium">
                {qty}
              </div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 border rounded-full flex items-center justify-center text-lg font-semibold hover:bg-gray-100 cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow transition cursor-pointer"
            >
              Add to cart
            </button>

            <div className="text-gray-700 text-sm">
              Total:{" "}
              <span className="font-semibold text-gray-900">
                ${(product.price * qty).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Confirmation message */}
          {confirm && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md inline-block">
              {confirm}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
