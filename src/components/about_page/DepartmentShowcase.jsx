import React from "react";
import { motion } from "framer-motion";
import { FaBullhorn, FaCogs, FaMicrochip, FaCode } from "react-icons/fa";

const clipLeft = "polygon(0 0, 100% 0, 85% 100%, 0% 100%)";
const clipRight = "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)";

const iconMap = {
  mechanical: FaCogs,
  electronics: FaMicrochip,
  coding: FaCode,
  marketing: FaBullhorn,
};

const Row = ({ item, index }) => {
  const isEven = index % 2 === 0; // 0-based: first row even
  const imageClip = isEven ? clipLeft : clipRight;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
        delay: index * 0.1,
      }}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 items-stretch rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-white/40 transition-colors`}
      >
        {/* Image side */}
        <div
          className={`${
            isEven ? "order-1" : "order-2"
          } relative h-full min-h-[16rem] md:min-h-[360px] lg:min-h-[420px]`}
        >
          <div
            className="absolute inset-0"
            style={{ WebkitClipPath: imageClip, clipPath: imageClip }}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center will-change-transform"
              initial={{ scale: 1.02, opacity: 0.9 }}
              whileInView={{ scale: 1.02, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.06 }}
            />
          </div>
        </div>

        {/* Content side */}
        <div className={`${isEven ? "order-2" : "order-1"} flex`}>
          <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#ff8c00]/20 rounded-xl flex items-center justify-center">
                {(() => {
                  const key = (item.iconKey || item.title || "")
                    .toString()
                    .toLowerCase();
                  const Icon = iconMap[key];
                  return Icon ? (
                    <Icon className="w-6 h-6 text-[#ff8c00]" />
                  ) : null;
                })()}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                {item.title}
              </h3>
            </div>
            <p className="font-body text-gray-300 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DepartmentShowcase = ({ items = [], fallbackImage }) => {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Departments Overview
          </h2>
          <p className="font-body text-gray-400 max-w-2xl mx-auto">
            Four pillars that power our research, innovation and competition
            success.
          </p>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {safeItems.map((raw, idx) => {
          const item = {
            ...raw,
            image: raw.image || fallbackImage,
          };
          return <Row key={`${item.title}-${idx}`} item={item} index={idx} />;
        })}
      </div>
    </section>
  );
};

export default DepartmentShowcase;
