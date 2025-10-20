

import React from "react";
import { Link } from "react-router-dom";

const MenuHeader = () => {
  return (
    <header className="relative bg-[#3b1d0b] text-white py-20 mb-10">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/menu-banner.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Header content */}
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Roboto']">
          Our Delicious Menu
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Treat yourself with our freshly baked cookies and cakes
        </p>

        {/* Back to Home button */}
        <Link
          to="/"
          className="inline-block bg-yellow-400 text-[#3b1d0b] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
        >
          &larr; Back to Home
        </Link>
      </div>
    </header>
  );
};

export default MenuHeader;
