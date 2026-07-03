import React, { useRef, useState } from "react";

const getCategoryStyles = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("foundation")) {
    return { 
      bg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400", 
      glow: "rgba(6, 182, 212, 0.15)",
      hue: 195 
    };
  }
  if (cat.includes("national")) {
    return { 
      bg: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400", 
      glow: "rgba(217, 70, 239, 0.15)",
      hue: 295 
    };
  }
  if (cat.includes("global")) {
    return { 
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", 
      glow: "rgba(16, 185, 129, 0.15)",
      hue: 150 
    };
  }
  if (cat.includes("racing")) {
    return { 
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-400", 
      glow: "rgba(245, 158, 11, 0.15)",
      hue: 38 
    };
  }
  if (cat.includes("innovation")) {
    return { 
      bg: "bg-violet-500/10 border-violet-500/20 text-violet-400", 
      glow: "rgba(139, 92, 246, 0.15)",
      hue: 265 
    };
  }
  if (cat.includes("design")) {
    return { 
      bg: "bg-rose-500/10 border-rose-500/20 text-rose-400", 
      glow: "rgba(244, 63, 94, 0.15)",
      hue: 345 
    };
  }
  return { 
    bg: "bg-orange-500/10 border-orange-500/20 text-[#ff8c00]", 
    glow: "rgba(255, 140, 0, 0.15)",
    hue: 30 
  };
};

const TimelineCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const catStyle = getCategoryStyles(item.category);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    const px = (x / rect.width) * 2 - 1; // -1..1
    const py = (y / rect.height) * 2 - 1;
    const rotateX = -(py * 2.5);
    const rotateY = px * 2.5;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.008)`;
  };

  const onEnter = () => {
    setHovered(true);
  };

  const onLeave = () => {
    setHovered(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  // Title parsing logic
  const titleParts = item.title.split(" - ");
  const displayTitle = titleParts[0];
  const displayAward = titleParts[1] || "";

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="achievement-card-item group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 w-full opacity-0"
      style={{
        background: hovered 
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${catStyle.glow}, transparent 80%), rgba(10, 10, 10, 0.7)`
          : "rgba(10, 10, 10, 0.4)",
        borderColor: hovered ? `hsla(${catStyle.hue}, 70%, 50%, 0.35)` : "rgba(255, 255, 255, 0.06)",
        boxShadow: hovered ? `0 0 30px hsla(${catStyle.hue}, 90%, 60%, 0.04)` : "none",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}
    >
      {/* Content wrapper */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full min-h-[180px] sm:min-h-[200px]">
        <div>
          {/* Metadata Top Row */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <span
              className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-2.5 py-1 border rounded-full ${catStyle.bg}`}
            >
              {item.category}
            </span>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              {item.status || "Completed"}
            </div>
          </div>

          {/* Title & Rank */}
          <div className="mb-4">
            <h4 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
              {displayTitle}
            </h4>
            {displayAward && (
              <div className="font-mono text-[11px] sm:text-xs text-[#ff8c00] font-black uppercase tracking-wider flex items-center gap-1.5 mt-2 bg-[#ff8c00]/[0.06] border border-[#ff8c00]/25 rounded-md px-2.5 py-1 w-fit shadow-[0_0_10px_rgba(255,140,0,0.05)]">
                <span className="text-[10px] text-[#ff8c00]">✦</span>
                {displayAward}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-body text-[13.5px] sm:text-[14.5px] text-neutral-400 leading-relaxed border-l border-white/[0.04] pl-4">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
