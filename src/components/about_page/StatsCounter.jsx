import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { PiDroneFill } from "react-icons/pi";

const iconMap = {
  users: FaUsers,
  trophy: FaTrophy,
  drone: PiDroneFill,
};

const StatsCounter = ({ items = [], durationMs = 1200 }) => {
  const [values, setValues] = useState(() =>
    items.reduce((acc, item) => ({ ...acc, [item.label]: 0 }), {})
  );
  const targetValues = useRef(
    items.reduce(
      (acc, item) => ({ ...acc, [item.label]: item.target || 0 }),
      {}
    )
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (!isInView) return;
    const interval = 40;
    const steps = Math.max(1, Math.floor(durationMs / interval));
    const timer = setInterval(() => {
      setValues((prev) => {
        const next = { ...prev };
        let allDone = true;
        items.forEach((item) => {
          const label = item.label;
          const target = targetValues.current[label] || 0;
          const current = prev[label] || 0;
          const inc = target / steps;
          if (current < target) {
            next[label] = Math.min(current + inc, target);
            allDone = false;
          } else {
            next[label] = target;
          }
        });
        if (allDone) clearInterval(timer);
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, durationMs, items]);

  return (
    <section className="py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto">
            These numbers represent our commitment to excellence and growth.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = iconMap[item.iconKey] || FaUsers;
            return (
              <motion.div
                key={item.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transform-gpu will-change-transform transition-transform duration-100 ease-out hover:scale-[1.03] hover:shadow-md hover:shadow-white/5 hover:border-orange-500"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div className="w-14 h-14 bg-[#ff8c00] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-ui font-bold text-4xl text-white mb-2">
                  {Math.round(values[item.label])}
                  {item.suffix || ""}
                </div>
                <div className="font-body text-gray-400 font-medium">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
