import React, { useMemo, useState } from "react";
import Navbar from "../components/common/Navbar";
import BeamsBackground from "../components/common/BeamsBackground";
import FleetGrid from "../components/fleet/FleetGrid";

const Fleet = () => {
  // Single multi-select across statuses and types
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const allChips = useMemo(
    () => [
      { key: "Current", group: "status" },
      { key: "Retired", group: "status" },
      { key: "Racing", group: "type" },
      { key: "Surveillance", group: "type" },
      { key: "Package Delivery", group: "type" },
      { key: "Recon", group: "type" },
    ],
    []
  );

  const toggleFilter = (key) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (key === "__all__") return new Set();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask">
      <BeamsBackground intensity="medium" />
      <Navbar currentPage="Fleet" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.1]">
              Our Fleet
            </h1>
            <p className="font-body text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Two current drones and five retired builds. Purpose-built for
              racing, mapping and research.
            </p>
            <div className="mt-6">
              <a
                href="#fleet-grid"
                className="ui-text inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border transition-all border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20"
              >
                Browse the fleet
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 ui-text mb-8">
          <button
            onClick={() => toggleFilter("__all__")}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              selectedFilters.size === 0
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-800 text-gray-300 border-gray-700 hover:text-white hover:border-orange-500/70"
            }`}
          >
            All
          </button>
          {allChips.map((chip) => {
            const active = selectedFilters.has(chip.key);
            return (
              <button
                key={chip.key}
                onClick={() => toggleFilter(chip.key)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  active
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:text-white hover:border-orange-500/70"
                }`}
              >
                {chip.key}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <main id="fleet-grid" className="container mx-auto px-6 pb-16">
        <FleetGrid
          filters={{
            statuses: [
              ...["Current", "Retired"].filter((k) => selectedFilters.has(k)),
            ],
            types: [
              ...["Racing", "Surveillance"].filter((k) =>
                selectedFilters.has(k)
              ),
            ],
          }}
        />
      </main>
    </div>
  );
};

export default Fleet;
