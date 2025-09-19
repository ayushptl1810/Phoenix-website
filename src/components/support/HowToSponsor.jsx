import React from "react";
import { motion } from "framer-motion";

const HowToSponsor = () => {
  const steps = [
    {
      title: "Submit Interest",
      detail: "Share your focus and preferred support mode.",
    },
    {
      title: "Alignment Call",
      detail: "Scope impact areas, timing, and deliverables.",
    },
    {
      title: "MoU / Agreement",
      detail: "Confirm terms, recognition, and approvals.",
    },
    {
      title: "Delivery / Payment",
      detail: "Funds transfer or in‑kind logistics.",
    },
    {
      title: "Acknowledgment",
      detail: "We implement and share visible outcomes.",
    },
  ];

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

  const stepVariants = {
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
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center"
        variants={itemVariants}
      >
        How to Sponsor
      </motion.h2>

      <div className="lg:hidden space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {steps.slice(0, 3).map((s, idx) => (
            <motion.div
              key={s.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,140,0,0.18)]"
              variants={stepVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="ui-text text-xs text-gray-300 mb-2">
                Step {idx + 1}
              </div>
              <p className="text-white font-semibold text-lg">{s.title}</p>
              <p className="text-gray-300 text-sm mt-1">{s.detail}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-stretch">
          {steps.slice(3).map((s, idx) => (
            <motion.div
              key={s.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,140,0,0.18)]"
              variants={stepVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="ui-text text-xs text-gray-300 mb-2">
                Step {idx + 4}
              </div>
              <p className="text-white font-semibold text-lg">{s.title}</p>
              <p className="text-gray-300 text-sm mt-1">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <motion.div
          className="flex items-center justify-center max-w-6xl mx-auto"
          variants={itemVariants}
        >
          {steps.map((s, idx) => (
            <React.Fragment key={s.title}>
              <motion.div
                className="flex flex-col items-center text-center min-w-[180px]"
                variants={stepVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="ui-text w-20 h-20 text-4xl rounded-full border border-orange-500/60 bg-orange-500/10 text-white flex items-center justify-center mb-2">
                  {idx + 1}
                </div>
                <div className="text-white font-semibold">{s.title}</div>
                <div className="text-gray-300 text-sm max-w-[240px]">
                  {s.detail}
                </div>
              </motion.div>
              {idx < steps.length - 1 && (
                <motion.div
                  className="h-px mx-6 w-24 xl:w-32 bg-gradient-to-r from-white/10 via-white/40 to-white/10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowToSponsor;
