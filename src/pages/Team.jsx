import React from "react";
import { motion } from "framer-motion";
import { ExpandableCardDemo } from "../components/team/ExpandableCardDemo";
import Navbar from "../components/common/Navbar";
import { FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Team = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav */}
      <Navbar currentPage="Team" />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Removed local orange/blue glow background elements to rely on BeamsBackground */}
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

            {/* Core Team Cards - Directly after hero content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16"
            >
              <ExpandableCardDemo cardType="core" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Junior Core Team Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full mb-6">
              <FaRocket className="w-4 h-4 text-white" />
              <span className="font-ui text-sm text-white font-bold">
                Rising Stars
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Junior <span className="text-white">Innovators</span>
            </h2>
            <p className="font-body text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The next generation of drone technology pioneers. These talented
              individuals are already making significant contributions to our
              competition successes and breakthrough innovations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ExpandableCardDemo cardType="junior" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
