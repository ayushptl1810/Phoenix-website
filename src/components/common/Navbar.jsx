import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Navbar = ({ currentPage = "Home" }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-600/60 backdrop-blur-md bg-black/80 shadow-lg shadow-black/20">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Brand + Current Page */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={Logo}
              alt="DJS Phoenix Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="flex items-center space-x-2">
              <span className="font-display text-lg font-bold text-white tracking-tight">
                DJS PHOENIX
              </span>
              <span className="text-gray-400">•</span>
              <span className="font-ui text-sm text-orange-400 font-semibold tracking-wider">
                {currentPage}
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Navigation Menu */}
        <nav className="flex items-center space-x-1">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/team"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            Team
          </Link>
          <Link
            to="/achievements"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            Achievements
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
