import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/Logo.png";

const Navbar = ({ currentPage = "Home" }) => {
  return (
    <motion.header
      className="sticky top-0 z-300 border-b border-gray-600/60 backdrop-blur-md bg-black/80 shadow-lg shadow-black/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
    >
      <div className="container mx-auto px-6 h-20 md:h-20 flex items-center justify-between">
        {/* Left: Logo + Brand + Current Page */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <motion.img
              src={Logo}
              alt="DJS Phoenix Logo"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
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
        </motion.div>

        {/* Right: Navigation Menu */}
        <motion.nav
          className="flex items-center space-x-3 md:space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
            >
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/about"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
            >
              About
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/fleet"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
            >
              Fleet
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/team"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
            >
              Team
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/achievements"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
            >
              Achievements
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/support"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
            >
              Support Us
            </Link>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
