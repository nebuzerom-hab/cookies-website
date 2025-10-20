import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import TopHeader from "../Header/TopHeader";
import Footer from "../Footer/Footer";

import b1 from "../../assets/b1.jpg";
import c6 from "../../assets/c6.jpg";
import c7 from "../../assets/c7.jpg";
import cookies from "../../assets/cookies.jpg";
import imagesJpeg from "../../assets/images.jpeg";
import v7 from "../../assets/v7.jpg";
import two from "../../assets/2.jpg";
import three from "../../assets/3.jpg";
import four from "../../assets/4.jpg";
import five from "../../assets/5.jpg";
import six from "../../assets/6.jpg";

// 💡 Add these fonts in your index.html head tag:
// <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

const Layout = ({ children }) => {
  const images = [
    two,
    three,
    four,
    five,
    six,
    b1,
    c6,
    c7,
    cookies,
    imagesJpeg,
    v7,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all duration-1000 ease-in-out relative"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <TopHeader />

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-black/40 text-center px-4">
        {/* Main title */}
        <h1
          className="text-yellow-100 text-[90px] md:text-[160px] font-extrabold drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          style={{
            fontFamily: "'Great Vibes', cursive",
            letterSpacing: "3px",
            animation: "fadeIn 3s ease-in-out",
          }}
        >
          Habesha
        </h1>
        <h3
          className="text-yellow-50 text-[40px] md:text-[70px] font-semibold drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)] tracking-wider"
          style={{
            fontFamily: "'Poppins', sans-serif",
            animation: "fadeInUp 3s ease-in-out",
          }}
        >
          Cookies
        </h3>

        {/* New Hero Tagline Section */}
        <div className="mt-8 md:mt-12 max-w-2xl">
          <h2
            className="text-white text-3xl md:text-5xl font-semibold mb-4 drop-shadow-md"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            FRESH COOKIE DELIVERY
          </h2>
          <p className="text-gray-100 text-lg md:text-2xl mb-8">
            Giant, all natural cookies, delivered straight to your door 🍪
          </p>

          {/* CTA Button */}
          <Link
            to="/menu"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full text-lg shadow-lg transition transform hover:scale-105"
          >
            I Want Cookies!!!
          </Link>

          {/* Reviews */}
          <p className="text-gray-200 text-sm md:text-base mt-6">
            ⭐ 10,000+ Happy Reviews from cookie lovers worldwide!
          </p>
        </div>
      </div>

      {children}
      <Footer />
    </div>
  );
};

export default Layout;
