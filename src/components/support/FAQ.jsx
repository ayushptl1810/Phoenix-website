import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = ({ items }) => {
  const [open, setOpen] = useState(null);

  // Standardized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        FAQ
      </h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((qa, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={qa.q}
              className={`rounded-xl border border-white/15 bg-white/5 p-0 overflow-hidden transition-all hover:border-orange-500${
                isOpen ? "border-orange-500/40" : ""
              }`}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between transition-colors cursor-pointer"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="text-white font-medium">{qa.q}</span>
                <span
                  className={`text-gray-300 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`px-5 text-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "opacity-100 pb-4" : "opacity-0 pb-0"
                }`}
                style={{
                  maxHeight: isOpen ? "500px" : "0px",
                  transition:
                    "max-height 200ms ease-in-out, opacity 500ms ease-in-out, padding-bottom 200ms ease-in-out",
                }}
              >
                {qa.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
