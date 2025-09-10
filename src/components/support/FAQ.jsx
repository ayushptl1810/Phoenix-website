import React, { useState } from "react";

const FAQ = ({ items }) => {
  const [open, setOpen] = useState(null);
  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center reveal">
        FAQ
      </h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((qa, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={qa.q}
              className={`reveal rounded-xl border p-0 overflow-hidden transition-all ${
                isOpen
                  ? "border-orange-500/40 bg-white/10"
                  : "border-white/15 bg-white/5 hover:border-orange-500/30"
              }`}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="text-white font-medium">{qa.q}</span>
                <span className="text-gray-300">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="px-5 pb-4 text-gray-300">{qa.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
