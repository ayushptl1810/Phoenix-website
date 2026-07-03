import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getCardStyles = (key) => {
  if (key === "monetary") {
    return {
      bg: "bg-orange-500/10 border-orange-500/20 text-[#ff8c00]",
      glow: "rgba(255, 140, 0, 0.12)",
      hue: 30,
    };
  }
  return {
    bg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    glow: "rgba(6, 182, 212, 0.12)",
    hue: 195,
  };
};

const SupportCard = ({ card }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const style = getCardStyles(card.key);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    const rotateX = -(py * 2);
    const rotateY = px * 2;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.006)`;
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="ways-card-item opacity-0 h-full rounded-2xl border transition-all duration-300 w-full cursor-default"
      style={{
        background: hovered 
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${style.glow}, transparent 80%), rgba(10, 10, 10, 0.7)`
          : "rgba(10, 10, 10, 0.4)",
        borderColor: hovered ? `hsla(${style.hue}, 70%, 50%, 0.35)` : "rgba(255, 255, 255, 0.06)",
        boxShadow: hovered ? `0 0 30px hsla(${style.hue}, 90%, 60%, 0.04)` : "none",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}
    >
      <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full min-h-[220px]">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
            {card.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-5 leading-relaxed">
            {card.description}
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-400 space-y-2 border-l border-white/[0.04] pl-4">
            {card.highlights?.map((h) => (
              <li key={h} className="hover:text-white transition-colors duration-200">{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const WaysToSupport = ({ items }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate header
      gsap.fromTo(
        ".ways-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ways-header",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate cards in batch to avoid mounting offset calculations race conditions
      const cards = gsap.utils.toArray(".ways-card-item");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="ways-header opacity-0 text-center mb-6 sm:mb-10">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
          Ways to Support
        </h2>
        <p className="font-body text-sm sm:text-base lg:text-lg text-gray-300 px-4">
          Monetary or in‑kind. Choose what suits you best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {items.map((card) => (
          <SupportCard key={card.key} card={card} />
        ))}
      </div>
    </div>
  );
};

export default WaysToSupport;
