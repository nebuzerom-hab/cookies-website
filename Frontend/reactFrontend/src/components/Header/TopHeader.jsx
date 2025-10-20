// import React, { useState } from "react";
// import logo from "../../assets/Chocolate.webm";
// import { Link } from "react-router-dom";
// import { CiMenuFries } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";

// const TopHeader = () => {
//   const [cartCount, setCartCount] = useState(3);

//   return (
//     <header className="bg-[#3b1d0b] h-[100px] w-full flex items-center px-6 shadow-md overflow-hidden font-['Roboto'] text-white">
//       {/* Left: Logo + Animated Text */}
//       <div className="flex items-center gap-4 flex-shrink-0">
//         <h1 className="flex items-center text-2xl font-playfair font-bold animate-scroll whitespace-nowrap">
//           habesha
//           <video
//             src={logo}
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="h-[4.5em] w-auto mx-2 align-middle rounded-full"
//           />
//           cookies
//         </h1>
//       </div>

//       {/* Middle: Main Navigation Links */}
//       <ul className="flex items-center gap-8 mx-auto">
//         <li>
//           <Link to="/" className="hover:border-b-2 border-white transition">
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/menu" className="hover:border-b-2 border-white transition">
//             Menu
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/about"
//             className="hover:border-b-2 border-white transition"
//           >
//             About Us
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/contact"
//             className="hover:border-b-2 border-white transition"
//           >
//             Contact Us
//           </Link>
//         </li>
//       </ul>

//       {/* Right: Login, Order, Cart, Menu Icon */}
//       <ul className="flex items-center gap-6">
//         <li>
//           <Link
//             to="/login"
//             className="hover:border-b-2 border-white transition"
//           >
//             Login
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/guest-order"
//             className="hover:border-b-2 border-white transition"
//           >
//             Order Now
//           </Link>
//         </li>
//         <li className="relative">
//           <Link to="/cart">
//             <FaShoppingCart
//               size={28}
//               className="text-white hover:text-gray-300"
//             />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </li>
//         <li>
//           <CiMenuFries size={30} className="text-white" />
//         </li>
//       </ul>
//     </header>
//   );
// };

// export default TopHeader;
import React, { useState } from "react";
import logo from "../../assets/Chocolate.webm";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const TopHeader = () => {
  const [cartCount, setCartCount] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#3b1d0b] text-white shadow-md font-['Roboto']">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <h1 className="flex items-center text-2xl font-bold whitespace-nowrap">
            habesha
            <video
              src={logo}
              autoPlay
              loop
              muted
              playsInline
              className="h-10 w-10 object-cover mx-2 rounded-full"
            />
            cookies
          </h1>
        </div>

        {/* Middle: Nav Links (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-8 text-base">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-yellow-400 transition">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-400 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right: Profile, Order, Cart, Menu */}
        <div className="flex items-center gap-6">
          {/* Profile icon */}
          <Link to="/login" className="hover:text-yellow-400 transition">
            <FaUserCircle size={28} />
          </Link>

          {/* Order now */}
          <Link
            to="/guest-order"
            className="hidden sm:block hover:text-yellow-400 transition"
          >
            Order Now
          </Link>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <FaShoppingCart size={26} className="hover:text-yellow-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <CiMenuFries size={30} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-[#2a1307] text-center py-4 space-y-3 text-lg">
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-400"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-400"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-400"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/guest-order"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-400"
            >
              Order Now
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default TopHeader;
