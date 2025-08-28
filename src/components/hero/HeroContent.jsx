import React from "react";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const HeroContent = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Team Name - Hero Title */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-none tracking-tight">
          <span className="block">DJS</span>
          <span className="block text-accent">PHOENIX</span>
        </h1>

        {/* Slogan/Tagline */}
        <p className="font-body text-xl md:text-2xl lg:text-3xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
          Where music meets innovation, and every beat tells a story
        </p>

        {/* Established Date - Redesigned */}
        <div className="mb-12 flex items-center justify-center">
          <div className="relative group">
            <div className="relative bg-black/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#ff8c00] rounded-full animate-pulse"></div>
                <span className="font-ui font-bold text-white text-lg tracking-wide">
                  Est. 2017
                </span>
                <div className="w-2 h-2 bg-[#ff8c00] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="px-8 py-4 border-2 border-[#ff8c00] bg-[#ff8c00] text-black font-ui font-bold text-lg rounded-lg transition-all duration-300 hover:bg-transparent hover:text-[#ff8c00] hover:scale-105 cursor-pointer">
            Explore Our Work
          </button>

          <button className="px-8 py-4 border-2 border-white text-white font-ui font-bold text-lg rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 cursor-pointer">
            Meet The Team
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 text-white/70">
          <a
            href="mailto:djsphoenixteam@gmail.com"
            className="hover:text-white transition-colors duration-300"
          >
            <MdEmail className="w-8 h-8" />
          </a>
          <a
            href="https://www.instagram.com/djs_phoenix/"
            className="hover:text-white transition-colors duration-300"
          >
            <FaInstagram className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/company/djs-phoenix"
            className="hover:text-white transition-colors duration-300"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </main>
  );
};

export default HeroContent;
