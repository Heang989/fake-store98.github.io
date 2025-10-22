import React from "react";

const FooterPage = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">FakeStore</h2>
        <p className="text-sm text-blue-100">
          © {new Date().getFullYear()} FakeStore. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/shop" className="hover:underline">Shop</a>
          <a href="/about" className="hover:underline">About</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
