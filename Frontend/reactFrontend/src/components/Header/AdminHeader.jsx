import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Chocolate.webm";

const AdminHeader = ({ adminName = "Admin" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens/session here
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="bg-[#3b1d0b]/90 h-[100px] w-full max-w-6xl mx-auto flex justify-between items-center rounded-2xl mt-10 px-8 shadow-lg text-white">
      {/* Left Section: Dashboard Logo */}
      <div className="flex items-center gap-4">
        <video
          src={logo}
          autoPlay
          loop
          muted
          playsInline
          className="h-14 w-14 object-cover rounded-full border-2 border-yellow-400 shadow-md"
        />
        <h1 className="text-yellow-400 text-xl font-semibold">
          Admin Dashboard
        </h1>
      </div>

      {/* Center Section: Optional - can add notifications here */}
      <div className="flex-1 text-center">
        <h2
          className="text-yellow-200 text-lg font-bold"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Habesha Cookies
        </h2>
      </div>

      {/* Right Section: Admin Info + Logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <h3 className="text-white/90 text-sm">Welcome,</h3>
          <p className="text-yellow-400 font-semibold">{adminName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-[#3b1d0b] font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
