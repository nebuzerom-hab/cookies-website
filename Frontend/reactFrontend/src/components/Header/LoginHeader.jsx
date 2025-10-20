import React from "react";
import { Link } from "react-router-dom";
import call from "../../assets/call.png";
import logo from "../../assets/Chocolate.webm";

const LoginHeader = () => {
  return (
    <header className="bg-[#3b1d0b]/90 h-[120px] w-full max-w-6xl mx-auto flex justify-between items-center rounded-2xl mt-10 px-8 shadow-lg text-white">
      {/* Left Section: Call Info */}
      <div className="flex items-center gap-4">
        <img
          src={call}
          alt="Call Icon"
          className="h-14 w-14 rounded-full object-cover bg-white/20 p-2"
        />
        <div>
          <h1 className="text-yellow-400 text-lg font-semibold">
            Please Call Before Ordering
          </h1>
          <h2 className="text-white/90 text-base font-medium">
            +1 (502) 222-2222
          </h2>
          <Link
            to="/"
            className="text-yellow-300 hover:text-yellow-400 inline-block mt-1 text-sm border-b border-transparent hover:border-yellow-400 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>

      {/* Center Section: Logo + Text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <video
          src={logo}
          autoPlay
          loop
          muted
          playsInline
          className="h-16 w-16 object-cover rounded-full border-2 border-yellow-400 shadow-md"
        />
        <h2
          className="text-2xl font-bold text-yellow-200 mt-2 tracking-wide"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Habesha Cookies
        </h2>
      </div>

      {/* Right Section: Location */}
      <div className="text-right">
        <h1 className="text-yellow-400 text-lg font-semibold">Our Location</h1>
        <p className="text-white/90 text-sm">22079, Lorton, VA</p>
        <p className="text-white/70 text-sm">Virginia, USA</p>
      </div>
    </header>
  );
};

export default LoginHeader;
