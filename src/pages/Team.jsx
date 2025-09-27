import React from "react";
import { motion } from "framer-motion";
import { ExpandableCardDemo } from "../components/team/ExpandableCardDemo";
import Navbar from "../components/common/Navbar";
import { HiSparkles } from "react-icons/hi2";

const Team = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <Navbar currentPage="Team" />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HiSparkles className="w-4 h-4 text-white" />
              <span className="font-ui text-sm text-white font-bold">
                Championship Team
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Minds Behind
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DJS Phoenix
              </span>
            </motion.h1>

            <motion.p
              className="font-body text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Award-winning innovators, competition champions, and the future
              leaders of drone technology. Meet the exceptional team that has
              conquered national and international competitions.
            </motion.p>

            {/* Team Cards - Unified Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <ExpandableCardDemo />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
