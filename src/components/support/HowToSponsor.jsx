import React from "react";

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

  return (
    <section className="container mx-auto px-6 max-w-5xl py-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 text-center reveal text-align-center">
        How to Sponsor
      </h2>

      <div className="lg:hidden space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {steps.slice(0, 3).map((s, idx) => (
            <div
              key={s.title}
              className="reveal rounded-2xl border border-white/15 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,140,0,0.18)]"
            >
              <div className="ui-text text-xs text-gray-300 mb-2">
                Step {idx + 1}
              </div>
              <p className="text-white font-semibold text-lg">{s.title}</p>
              <p className="text-gray-300 text-sm mt-1">{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-stretch">
          {steps.slice(3).map((s, idx) => (
            <div
              key={s.title}
              className="reveal rounded-2xl border border-white/15 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,140,0,0.18)]"
            >
              <div className="ui-text text-xs text-gray-300 mb-2">
                Step {idx + 4}
              </div>
              <p className="text-white font-semibold text-lg">{s.title}</p>
              <p className="text-gray-300 text-sm mt-1">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="reveal flex items-center justify-center max-w-6xl mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.title}>
              <div className="flex flex-col items-center text-center min-w-[180px]">
                <div className="ui-text w-20 h-20 text-4xl rounded-full border border-orange-500/60 bg-orange-500/10 text-white flex items-center justify-center mb-2">
                  {idx + 1}
                </div>
                <div className="text-white font-semibold">{s.title}</div>
                <div className="text-gray-300 text-sm max-w-[240px]">
                  {s.detail}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-px mx-6 w-24 xl:w-32 bg-gradient-to-r from-white/10 via-white/40 to-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSponsor;
