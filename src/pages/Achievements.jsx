import React from "react";
import { Link } from "react-router-dom";
import Timeline from "../components/achievements/Timeline";
import Navbar from "../components/common/Navbar";

const Achievements = () => {
  return (
    <div className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask">
      {/* Top Nav */}
      <Navbar currentPage="Achievements" />

      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Removed orange gradient overlay to rely on BeamsBackground */}
        <div className="absolute inset-0"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1] pb-1">
              Our Journey of Success
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From our humble beginnings to becoming a force to reckon with in
              the drone racing world. Every competition, every challenge, every
              victory has shaped who we are today.
            </p>
          </div>
        </div>

        {/* Removed floating orange glow elements */}
      </div>

      {/* Main Timeline */}
      <main className="container mx-auto px-6 py-16">
        <Timeline />
      </main>

      {/* Bottom Band (non-CTA) */}
      <footer className="border-t border-gray-700/80 bg-black/60">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DJS PHOENIX • Since 2017
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                to="/"
                className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-orange-500/70 hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                Home
              </Link>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-orange-500/70 hover:bg-orange-500/20 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Achievements;
