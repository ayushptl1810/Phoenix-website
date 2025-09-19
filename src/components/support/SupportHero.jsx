import React from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

const SupportHero = ({ data }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 container mx-auto px-6 max-w-5xl py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HiSparkles className="w-4 h-4 text-white" />
            <span className="font-ui text-sm text-white font-bold">
              Partner With Us
            </span>
          </motion.div>
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.title}
          </motion.h1>
          <motion.p
            className="font-body text-xl md:text-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {data.primaryCta && (
              <motion.a
                href={data.primaryCta.href}
                target={data.primaryCta.target}
                rel={
                  data.primaryCta.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="ui-text inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-all border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.primaryCta.label}
              </motion.a>
            )}
            {data.secondaryCta && (
              <motion.a
                href={data.secondaryCta.href}
                target={data.secondaryCta.target}
                rel={
                  data.secondaryCta.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="ui-text inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-all border-white/30 bg-white/5 text-white hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.secondaryCta.label}
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;
