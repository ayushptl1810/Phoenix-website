import { useRef } from "react";
import { GiLaurelCrown } from "react-icons/gi";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import competitions from "./competitionData";

gsap.registerPlugin(ScrollTrigger);

const CompetitionCard = ({ competition, index, isWide }) => {
  const cardRef = useRef(null);

  const num = String(index + 1).padStart(2, "0");
  const isCompleted = competition.status === "completed";
  const statusColor = isCompleted ? "#4ade80" : "#3b82f6";

  const onEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: "inset 0 0 50px rgba(255, 140, 0, 0.08)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "none",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      className="competition-card-item opacity-0 relative overflow-hidden cursor-default"
      style={{
        background: "#070707",
        border: "1px solid rgba(255, 140, 0, 0.45)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Content */}
      <div
        className={`relative z-10 flex flex-col h-full ${
          isWide ? "p-8 sm:p-12" : "p-6 sm:p-8"
        }`}
      >
        {/* Meta row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span
              className="font-mono font-bold tracking-[0.22em] uppercase"
              style={{ fontSize: "10px", color: "#ff8c00" }}
            >
              MIS {num}
            </span>
            <span
              className="w-6 h-px"
              style={{ background: "rgba(255, 140, 0, 0.25)" }}
            />
            <span
              className="font-mono tracking-[0.16em] uppercase text-neutral-500"
              style={{ fontSize: "10px" }}
            >
              {competition.date}
            </span>
          </div>

          {/* Status pill */}
          <div className="flex items-center gap-2">
            <span
              className="font-mono tracking-[0.15em] uppercase"
              style={{ fontSize: "9px", color: statusColor }}
            >
              {competition.status}
            </span>
            <span className="relative flex h-[7px] w-[7px]">
              {!isCompleted && (
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: statusColor }}
                />
              )}
              <span
                className="relative inline-flex rounded-full h-[7px] w-[7px]"
                style={{ backgroundColor: statusColor }}
              />
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white leading-none tracking-tighter mb-5"
          style={{
            fontSize:
              isWide ?
                "clamp(2rem, 4vw, 3.5rem)"
              : "clamp(1.6rem, 3vw, 2.25rem)",
          }}
        >
          {competition.name}
        </h3>

        {/* Separator */}
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="h-px"
            style={{
              flex: "0 0 72px",
              background: "#ff8c00",
              opacity: 0.35,
            }}
          />
          <div
            className="w-[5px] h-[5px] rotate-45"
            style={{ background: "rgba(255, 140, 0, 0.3)" }}
          />
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, rgba(255, 140, 0, 0.15), transparent)",
            }}
          />
        </div>

        {/* Description */}
        <p
          className="font-body text-neutral-400 leading-relaxed flex-1 mb-6"
          style={{
            fontSize: isWide ? "clamp(0.875rem, 1.1vw, 1.05rem)" : "0.875rem",
            maxWidth: isWide ? "600px" : undefined,
          }}
        >
          {competition.description}
        </p>

        {/* Footer tags */}
        <div className="flex items-center flex-wrap gap-2.5">
          <span
            className="font-mono tracking-[0.16em] uppercase px-3 py-1.5 border"
            style={{
              fontSize: "9px",
              color: "rgba(255, 140, 0, 0.85)",
              background: "rgba(255, 140, 0, 0.07)",
              borderColor: "rgba(255, 140, 0, 0.16)",
            }}
          >
            {competition.category}
          </span>

          {competition.achievement && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 border"
              style={{
                background: "rgba(74, 222, 128, 0.07)",
                borderColor: "rgba(74, 222, 128, 0.16)",
              }}
            >
              <GiLaurelCrown className="w-3 h-3" style={{ color: "#4ade80" }} />
              <span
                className="font-mono tracking-wider uppercase"
                style={{ fontSize: "9px", color: "#4ade80" }}
              >
                {competition.achievement}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CompetitionsSection = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".competitions-header",
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".competitions-header",
            start: "top 95%",
            end: "top 65%",
            scrub: 1,
          },
        },
      );

      const cards = gsap.utils.toArray(".competition-card-item");
      cards.forEach((card, idx) => {
        const isLeft = idx % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -60 : 60, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const firstPair = competitions.slice(0, 2);
  const remainder = competitions.slice(2);

  return (
    <section className="bg-black relative overflow-hidden">
      {/* Ambient top-edge glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,140,0,0.25), transparent)",
        }}
      />

      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
      >
        {/* ── Header ── */}
        <div className="mb-14 sm:mb-20 competitions-header opacity-0">
          <h2
            className="font-display font-bold text-white leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
          >
            Plans For
            <span className="block" style={{ color: "#ff8c00" }}>
              2025 — 2026
            </span>
          </h2>

          <p
            className="font-body text-neutral-400 max-w-lg"
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
              lineHeight: 1.65,
            }}
          >
            Showcasing our journey through innovation challenges and
            technological breakthroughs.
          </p>
        </div>

        {/* ── Cards: first pair side-by-side ── */}
        <div
          className="grid sm:grid-cols-2"
          style={{ gap: "1px", background: "rgba(255,140,0,0.06)" }}
        >
          {firstPair.map((c, i) => (
            <CompetitionCard
              key={c.id}
              competition={c}
              index={i}
              isWide={false}
            />
          ))}
        </div>

        {/* ── Cards: remainder full-width ── */}
        {remainder.length > 0 && (
          <div
            className="grid grid-cols-1"
            style={{
              gap: "1px",
              background: "rgba(255,140,0,0.06)",
              marginTop: "1px",
            }}
          >
            {remainder.map((c, i) => (
              <CompetitionCard
                key={c.id}
                competition={c}
                index={i + firstPair.length}
                isWide={true}
              />
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-10">
          <Link to="/achievements">
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#ff8c00] bg-[#ff8c00] text-black font-ui font-bold text-base sm:text-lg rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300">
              View Achievements
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
