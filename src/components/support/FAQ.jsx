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
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.section
      className="container mx-auto px-6 max-w-5xl py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center"
        variants={itemVariants}
      >
        FAQ
      </motion.h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((qa, idx) => {
          const isOpen = open === idx;
          return (
            <motion.div
              key={qa.q}
              className={`rounded-xl border p-0 overflow-hidden transition-all ${
                isOpen
                  ? "border-orange-500/40 bg-white/10"
                  : "border-white/15 bg-white/5 hover:border-orange-500/30"
              }`}
              variants={faqVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.button
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-medium">{qa.q}</span>
                <motion.span
                  className="text-gray-300"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  +
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="px-5 pb-4 text-gray-300"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {qa.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FAQ;
