import React from "react";
import { Link } from "react-router-dom";
import call from "../../assets/call.png";
import logo from "../../assets/logo.jpg";

const OrderHeader = () => {
  return (
    <header className="bg-white/60 h-[120px] w-full mx-[160px] flex justify-between items-center mx-[140px] rounded-xl mt-[40px] px-6 shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          src={call}
          alt="Call Icon"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-red-950 text-xl font-bold">
            Please Call Before Ordering
          </h1>
          <h2 className="text-gray-700 font-medium">+1 (502) 222-2222</h2>
          <Link
            to="/"
            className="text-gray-700 hover:text-black hover:border-b-2 border-black inline-block mt-1"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Center Logo */}
      <div>
        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700, // bold
          }}
          className="text-6xl text-center"
        >
          Order dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="text-gray-800 text-center">
        <h1 className="text-lg font-semibold">Our Location</h1>
        <p className="text-sm">22079, Lorton, VA, Virginia</p>
      </div>
    </header>
  );
};

export default OrderHeader;
