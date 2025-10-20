import React from "react";
import { Link } from "react-router-dom";
import call from "../../assets/call.png";
import logo from "../../assets/logo.jpg";

const LoginHeader = () => {
  return (
    <header className="bg-white/60 h-[120px] w-full flex flex-col items-center justify-center rounded-xl mt-10 px-6 shadow-md font-['Roboto']">
      {/* Top section with logo */}
      <div className="flex items-center justify-center gap-4 w-full max-w-[1200px]">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-[200px] object-cover rounded-full border-l-4 border-r-4 border-black px-4"
          />
        </Link>

        {/* Welcome text */}
        <h1
          style={{ fontFamily: '"Playfair Display", serif' }}
          className="text-6xl font-bold text-center flex-1"
        >
          Welcome to Habesha Cookies
        </h1>
      </div>
    </header>
  );
};

export default LoginHeader;
