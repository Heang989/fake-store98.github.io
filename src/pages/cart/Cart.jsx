import React, { useEffect, useState } from "react";
import { products } from "../../data/product";
import { Link } from "react-router-dom";

function readCart() {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const Cart = () => {
  const [cart, setCart] = useState(readCart());

  useEffect(() => {
    const handler = () => setCart(readCart());
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(
      new CustomEvent("cart-updated", { detail: { cart: newCart } })
    );
  };

  const items = Object.keys(cart)
    .map((id) => {
      const pid = parseInt(id, 10);
      const product = products.find((p) => p.id === pid);
      return { product, qty: cart[id] };
    })
    .filter(Boolean);

  const setQty = (id, qty) => {
    const newCart = { ...cart };
    newCart[id] = qty;
    if (newCart[id] <= 0) delete newCart[id];
    updateCart(newCart);
  };

  const remove = (id) => {
    const newCart = { ...cart };
    delete newCart[id];
    updateCart(newCart);
  };

  const clear = () => updateCart({});

  const subtotal = items.reduce(
    (s, it) => s + (it.product?.price || 0) * it.qty,
    0
  );

  if (items.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600">
          Continue shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl mb-6">Shopping Cart</h2>
      <div className="grid grid-cols-1 gap-4">
        {items.map(({ product, qty }) => (
          <div
            key={product.id}
            className="flex gap-4 items-center border p-4 rounded-md bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-28 h-28 object-contain"
            />
            <div className="flex-1">
              <div className="font-semibold">{product.title}</div>
              <div className="text-sm text-gray-600">${product.price} each</div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => setQty(product.id, Math.max(0, qty - 1))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer"
                >
                  −
                </button>
                <div className="w-10 text-center">{qty}</div>
                <button
                  onClick={() => setQty(product.id, qty + 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => remove(product.id)}
                  className="ml-4 text-sm text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                ${(product.price * qty).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button onClick={clear} className="text-sm text-red-600 cursor-pointer">
          Clear cart
        </button>
        <div className="text-lg font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-4 py-2 rounded inline-block"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
