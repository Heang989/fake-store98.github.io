import React, { useState, useEffect } from "react";
import { products } from "../../data/product";
import { PiBankBold } from "react-icons/pi";
import { FaCreditCard } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

function readCart() {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const Checkout = () => {
  const cart = readCart();
  const items = Object.keys(cart)
    .map((id) => {
      const p = products.find((pp) => pp.id === parseInt(id, 10));
      return { product: p, qty: cart[id] };
    })
    .filter(Boolean);

  const subtotal = items.reduce(
    (s, it) => s + (it.product?.price || 0) * it.qty,
    0
  );

  const [method, setMethod] = useState("card");
  const [selectedImage, setSelectedImage] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [address, setAddress] = useState({
    country: "Cambodia",
    line1: "",
    line2: "",
    city: "",
    postal: "",
  });

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSelectedImage(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <aside className="bg-black text-white p-8">
            <h2 className="text-xl font-semibold mb-6">Order summary</h2>
            {items.map(({ product, qty }) => (
              <div
                key={product.id}
                className="mb-4 border-b border-gray-700 pb-4 flex items-center gap-4"
              >
                <div
                  className="w-20 h-20 bg-white rounded-md flex items-center justify-center p-1 cursor-pointer"
                  onClick={() => setSelectedImage(product.image)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-semibold">{product.title}</div>
                  <div className="text-sm text-gray-300">
                    {qty} × ${product.price}
                  </div>
                </div>
                <div className="ml-auto font-semibold">
                  ${(product.price * qty).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="mt-6 border-t border-gray-700 pt-4">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                Subtotal <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                Tax <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold mt-4">
                Total <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>

          <section className="p-8">
            <h2 className="text-xl font-semibold mb-4 text-left">Contact information</h2>
            <div className="mb-6">
              <input
                className="w-full border rounded p-3"
                placeholder="Email"
              />
            </div>

            <h3 className="text-lg font-semibold mb-2 text-left">Payment method</h3>
            <div className="grid gap-3 mb-6">
              <label
                className={`flex items-start gap-2 justify-between rounded-md p-2 cursor-pointer bg-white border ${
                  method === "card"
                    ? "border-gray-300 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="card"
                  className="sr-only"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full border mr-2 flex items-center justify-center ${
                        method === "card" ? "bg-black" : "bg-white"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          method === "card" ? "bg-white" : "bg-transparent"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-sm">
                    <FaCreditCard />
                  </div>
                  <div className="text-sm font-medium">Card</div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="visa"
                    className="h-4"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="mc"
                    className="h-4"
                  />
                </div>
              </label>

              {method === "card" && (
                <div className="mt-2 mb-2 rounded-md p-3 bg-white border border-gray-200">
                  <h4 className="text-sm font-medium mb-2 text-left">Card information</h4>
                  <div className="relative mb-2">
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 1234 1234 1234"
                      className="w-full border rounded p-2 pr-24 text-sm"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        alt="visa"
                        className="h-4"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                        alt="mc"
                        className="h-4"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="flex-1 border rounded p-2 text-sm"
                    />
                    <div className="relative">
                      <input
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-28 border rounded p-2 pr-8 text-sm"
                      />
                      <BsCreditCard2Back
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="mb-2 text-left">
                    <label className="text-sm">Cardholder name</label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Full name on card"
                      className="w-full border rounded p-2 mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm">Billing address</label>
                    <select
                      value={address.country}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                      className="w-full border rounded p-2 mt-1 text-sm cursor-pointer"
                    >
                      <option>United States</option>
                      <option>Cambodia</option>
                      <option>United Kingdom</option>
                    </select>
                    <input
                      value={address.line1}
                      onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })
                      }
                      placeholder="Address line 1"
                      className="w-full border rounded p-2 mt-2 text-sm"
                    />
                    <input
                      value={address.line2}
                      onChange={(e) =>
                        setAddress({ ...address, line2: e.target.value })
                      }
                      placeholder="Address line 2"
                      className="w-full border rounded p-2 mt-2 text-sm"
                    />
                    <div className="flex gap-2 mt-2">
                      <input
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        placeholder="City"
                        className="flex-1 border rounded p-2 text-sm"
                      />
                      <input
                        value={address.postal}
                        onChange={(e) =>
                          setAddress({ ...address, postal: e.target.value })
                        }
                        placeholder="Postal code"
                        className="w-28 border rounded p-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              <label
                className={`flex items-center justify-between rounded-md p-2 cursor-pointer bg-white border ${
                  method === "alipay"
                    ? "border-gray-300 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="alipay"
                  className="sr-only"
                  checked={method === "alipay"}
                  onChange={() => setMethod("alipay")}
                />
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full border mr-2 flex items-center justify-center ${
                        method === "alipay" ? "bg-black" : "bg-white"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          method === "alipay" ? "bg-white" : "bg-transparent"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-sm">
                    💵
                  </div>
                  <div className="text-sm font-medium">Cash App Pay</div>
                </div>
                <div />
              </label>

              <label
                className={`flex items-center justify-between rounded-md p-2 cursor-pointer bg-white border ${
                  method === "bank"
                    ? "border-gray-300 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="bank"
                  className="sr-only"
                  checked={method === "bank"}
                  onChange={() => setMethod("bank")}
                />
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full border mr-2 flex items-center justify-center ${
                        method === "bank" ? "bg-black" : "bg-white"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          method === "bank" ? "bg-white" : "bg-transparent"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-sm">
                    <PiBankBold />
                  </div>
                  <div className="text-sm font-medium">Bank</div>
                </div>
                <div className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  $5 back
                </div>
              </label>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 ">
                <input type="checkbox" className="cursor-pointer" /> Save my information for faster
                checkout
              </label>
            </div>

            <div>
              <button className="w-full bg-black text-white py-3 rounded cursor-pointer">
                Complete purchase
              </button>
            </div>
          </section>
        </div>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  aria-label="Close preview"
                  className="text-sm text-gray-600 px-2 py-1 cursor-pointer"
                  onClick={() => setSelectedImage(null)}
                >
                  <IoCloseOutline />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
