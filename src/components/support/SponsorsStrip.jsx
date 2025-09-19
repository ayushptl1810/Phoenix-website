import React from "react";
import { motion } from "framer-motion";

const SponsorsStrip = ({ heading, note, logos = [], sizeOverrides = {} }) => {
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

  const logoVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
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
      <motion.div className="text-center mb-6" variants={itemVariants}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          {heading}
        </h2>
        {note && <p className="text-gray-300 mt-2">{note}</p>}
      </motion.div>
      {logos.length === 5 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-6">
            {logos.slice(0, 3).map((logo, index) => {
              const scale = logo.scale || sizeOverrides[logo.alt] || 1;
              return (
                <motion.div
                  key={logo.alt}
                  className="rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-center transition-all hover:border-orange-500/40 hover:bg-white/10"
                  variants={logoVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                    style={{ maxHeight: "3rem", transform: `scale(${scale})` }}
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6">
            {logos.slice(3, 5).map((logo, index) => {
              const scale = logo.scale || sizeOverrides[logo.alt] || 1;
              return (
                <motion.div
                  key={logo.alt}
                  className="rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-center transition-all hover:border-orange-500/40 hover:bg-white/10 min-w-30"
                  variants={logoVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                    style={{ maxHeight: "3rem", transform: `scale(${scale})` }}
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center">
          {logos.map((logo, index) => {
            const scale = logo.scale || sizeOverrides[logo.alt] || 1;
            return (
              <motion.div
                key={logo.alt}
                className="rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-center transition-all hover:border-orange-500/40 hover:bg-white/10"
                variants={logoVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                  style={{ maxHeight: "3rem", transform: `scale(${scale})` }}
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default SponsorsStrip;
