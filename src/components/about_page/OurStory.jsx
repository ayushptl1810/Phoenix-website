import React from "react";
import { motion } from "framer-motion";

const OurStory = ({ paragraphs = [] }) => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our Story
          </h2>
          <p className="font-body text-gray-400 max-w-2xl mx-auto">
            The journey behind our passion and persistence.
          </p>
        </div>

        <div className="space-y-6">
          {paragraphs.map((text, idx) => (
            <motion.p
              key={idx}
              className="font-body text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
