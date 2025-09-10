import React from "react";

const WaysToSupport = ({ items }) => {
  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <div className="text-center mb-10 reveal">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Ways to Support
        </h2>
        <p className="font-body text-lg text-gray-300">
          Monetary or in‑kind. Choose what suits you best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {items.map((card) => (
          <div key={card.key} className="reveal h-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-transparent p-6 transition-all duration-300 hover:border-orange-500/40 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,140,0,0.25)] h-full">
              <div className="pointer-events-none absolute left-0 inset-y-0 w-1 rounded-l-2xl bg-gradient-to-b from-orange-500/60 via-orange-400/30 to-transparent" />
              <h3 className="font-display text-2xl text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-300 mb-4">{card.description}</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {card.highlights?.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WaysToSupport;
