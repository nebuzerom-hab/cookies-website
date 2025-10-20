import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-yellow-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md">
        <FaLock className="text-amber-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Access Denied 😢
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to view this page. Only authorized
          users (like admins or managers) can access this section.
        </p>
        <Link
          to="/"
          className="bg-amber-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-amber-600 transition duration-300"
        >
          🍪 Back to Home
        </Link>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        — Habesha Cookies Admin Portal —
      </p>
    </div>
  );
};

export default Unauthorized;
