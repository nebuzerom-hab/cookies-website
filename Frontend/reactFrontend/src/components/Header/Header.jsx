import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { CiMenuFries } from "react-icons/ci";

const Header = () => {
  return (
    <header className="bg-white/60 h-24 flex items-center mx-20 rounded-xl">
      <nav className="container mx-auto flex items-center gap-[200px]">
        {/* Logo */}
        <img
          src={logo}
          alt="My Logo"
          className="h-20 rounded-full w-auto pl-[100px]"
        />

        {/* Navigation Links */}
        <ul className="flex space-x-12 pl-[100px]">
          <li>
            <Link
              to="/"
              className="hover:border-b-4 hover:border-black hover:text-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="hover:border-b-4 hover:border-black hover:text-black"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:border-b-4 hover:border-black hover:text-black"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:border-b-4 hover:border-black hover:text-black"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <ul className="flex space-x-12 pl-[50px]">
          <li>
            <Link
              to="/login"
              onClick={() => console.log("Clicked Login")}
              className="hover:border-b-4 hover:border-black hover:text-black"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="guest-order"
              className="hover:border-b-4 hover:border-black hover:text-black"
            >
              Order Now
            </Link>
          </li>
          <li>
            <CiMenuFries size={40} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
