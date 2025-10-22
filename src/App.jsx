import Checkout from "./pages/checkout/Checkout";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import HeaderPage from "./components/HeaderPage";
import FooterPage from "./components/FooterPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductDetail from "./pages/product-detail/ProductDetail";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <HeaderPage />
      <main style={{ padding: "12px 20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <FooterPage />
    </BrowserRouter>
  );
}

export default App;
