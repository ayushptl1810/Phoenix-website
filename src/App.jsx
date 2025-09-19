import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import Team from "./pages/Team";
import Fleet from "./pages/Fleet";
import BeamsBackground from "./components/common/BeamsBackground";
import SiteFooter from "./components/common/SiteFooter";
import About from "./pages/About";
import Support from "./pages/Support";

const App = () => {
  const location = useLocation();

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3, // Faster transition to reduce flash
  };

  // Handle scroll to top during page transition
  const handlePageChange = () => {
    // Scroll to top during the fade animation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // Small delay to let animation start
  };

  return (
    <div className="min-h-screen bg-black relative">
      <BeamsBackground intensity="strong" />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={handlePageChange}
      >
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="font-display text-6xl font-bold text-orange-500 mb-4">
                      404
                    </h1>
                    <p className="font-body text-xl text-gray-300 mb-8">
                      Page not found
                    </p>
                    <a
                      href="/"
                      className="ui-text px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
};

export default App;
