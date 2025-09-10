import React from "react";

const SponsorsStrip = ({ heading, note, logos = [], sizeOverrides = {} }) => {
  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <div className="text-center mb-6 reveal">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          {heading}
        </h2>
        {note && <p className="text-gray-300 mt-2">{note}</p>}
      </div>
      {logos.length === 5 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-6">
            {logos.slice(0, 3).map((logo) => {
              const scale = logo.scale || sizeOverrides[logo.alt] || 1;
              return (
                <div
                  key={logo.alt}
                  className="reveal rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-center transition-all hover:border-orange-500/40 hover:bg-white/10"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                    style={{ maxHeight: "3rem", transform: `scale(${scale})` }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6">
            {logos.slice(3, 5).map((logo) => {
              const scale = logo.scale || sizeOverrides[logo.alt] || 1;
              return (
                <div
                  key={logo.alt}
                  className="reveal rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-center transition-all hover:border-orange-500/40 hover:bg-white/10 min-w-30"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                    style={{ maxHeight: "3rem", transform: `scale(${scale})` }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center">
          {logos.map((logo) => {
            const scale = logo.scale || sizeOverrides[logo.alt] || 1;
            return (
              <div
                key={logo.alt}
                className="reveal rounded-xl border border-white/15 bg-white/5 p-4 flex items-center justify-center transition-all hover:border-orange-500/40 hover:bg-white/10"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-auto object-contain filter grayscale invert opacity-80 hover:opacity-100 transition"
                  style={{ maxHeight: "3rem", transform: `scale(${scale})` }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SponsorsStrip;
