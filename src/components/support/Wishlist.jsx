import React from "react";

const Wishlist = ({ groups }) => {
  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <div className="text-center mb-8 reveal">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          In‑Kind Wishlist
        </h2>
        <p className="font-body text-lg text-gray-300 mt-2">
          Items and services that create immediate impact.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {groups.map((group) => (
          <div key={group.category} className="reveal h-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-transparent p-6 transition-all duration-300 hover:border-orange-500/40 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,140,0,0.25)] h-full flex flex-col">
              <div className="pointer-events-none absolute left-0 inset-y-0 w-1 rounded-l-2xl bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-xl">
                  {group.category}
                </h3>
                <a
                  href={`?supportType=In%E2%80%91Kind&interest=${encodeURIComponent(
                    group.category
                  )}#contact`}
                  className="ui-text inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20"
                >
                  Sponsor this area
                </a>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((it, i) => (
                  <li
                    key={group.category + i}
                    className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-gray-200 hover:border-orange-500/40 hover:bg-white/10 transition-colors"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
