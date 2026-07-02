import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/common/Navbar";
import SiteFooter from "../components/common/SiteFooter";
import FleetGrid from "../components/fleet/FleetGrid";
import Drone3DModal from "../components/fleet/Drone3DModal";

const Fleet = () => {
  const [selected3DDrone, setSelected3DDrone] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025-2026");
  const containerRef = useRef(null);
  const drumRef = useRef(null);
  const gridPanelRef = useRef(null);
  const leftPanelRef = useRef(null);

  const yearOptions = [
    { key: "pre-2024", label: "Pre-2024" },
    { key: "2024-2025", label: "2024-2025" },
    { key: "2025-2026", label: "2025-2026" },
  ];

  const activeIndex = yearOptions.findIndex((y) => y.key === selectedYear);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Entrance animation for header, tabs, and grid
      tl.fromTo(
        ".fleet-header",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
      );
      tl.fromTo(
        ".fleet-tabs-section",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      );
      tl.fromTo(
        ".fleet-grid-section",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  const lastScrollTime = useRef(0);
  const scrollAccumulator = useRef(0);
  const touchStart = useRef(0);

  // Wheel over the entire left sidebar cycles years (desktop only)
  useEffect(() => {
    const el = leftPanelRef.current;
    if (!el) return;

    const onWheelEvent = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 450) return;

      scrollAccumulator.current += e.deltaY;

      if (Math.abs(scrollAccumulator.current) >= 40) {
        const isDown = scrollAccumulator.current > 0;
        scrollAccumulator.current = 0;
        lastScrollTime.current = now;

        setSelectedYear((prev) => {
          const idx = yearOptions.findIndex((y) => y.key === prev);
          if (isDown && idx < yearOptions.length - 1) return yearOptions[idx + 1].key;
          if (!isDown && idx > 0) return yearOptions[idx - 1].key;
          return prev;
        });
      }
    };

    el.addEventListener("wheel", onWheelEvent, { passive: false });
    return () => el.removeEventListener("wheel", onWheelEvent);
  }, []);

  // Touch handlers to support swipe gestures on mobile
  useEffect(() => {
    const drumEl = drumRef.current;
    if (!drumEl) return;

    const onTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 450) return;

      const touchEnd = e.touches[0].clientY;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) >= 40) {
        const isDown = diff > 0;
        lastScrollTime.current = now;
        touchStart.current = touchEnd;

        setSelectedYear((prev) => {
          const idx = yearOptions.findIndex((y) => y.key === prev);
          if (isDown && idx < yearOptions.length - 1) return yearOptions[idx + 1].key;
          if (!isDown && idx > 0) return yearOptions[idx - 1].key;
          return prev;
        });
      }
    };

    drumEl.addEventListener("touchstart", onTouchStart, { passive: true });
    drumEl.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      drumEl.removeEventListener("touchstart", onTouchStart);
      drumEl.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Scroll right panel to top whenever the year changes
  useEffect(() => {
    if (gridPanelRef.current) {
      gridPanelRef.current.scrollTop = 0;
    }
  }, [selectedYear]);

  // Lock page scroll on desktop so only the right panel scrolls
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      document.documentElement.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white flex flex-col md:h-screen md:overflow-hidden">
      <Navbar currentPage="Fleet" />

      {/* Split-pane content area — fills remaining height on desktop */}
      <div className="flex-1 md:overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:h-full md:gap-16">

          {/* Left Column: no scroll on desktop, wheel cycles years */}
          <div ref={leftPanelRef} className="w-full md:w-80 md:flex-shrink-0 md:overflow-hidden py-10 md:py-10 flex flex-col gap-8">
            <div className="fleet-header opacity-0">
              <h1
                className="font-display font-bold text-white leading-none tracking-tighter mb-4"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
              >
                Our Fleet
              </h1>
              <p
                className="font-body text-neutral-400"
                style={{
                  fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                  lineHeight: 1.65,
                }}
              >
                Two current drones and five retired builds. Purpose-built for
                racing, mapping and research.
              </p>
            </div>

            {/* Year Selector */}
            <div className="fleet-tabs-section opacity-0">

              {/* Mobile: flat horizontal tabs */}
              <div className="md:hidden flex w-full border border-white/[0.08]">
                {yearOptions.map((year, idx) => {
                  const isActive = selectedYear === year.key;
                  return (
                    <button
                      key={year.key}
                      onClick={() => setSelectedYear(year.key)}
                      className="flex-1 py-3 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none"
                      style={{
                        background: isActive ? "#ff8c00" : "transparent",
                        color: isActive ? "#000" : "rgba(255,255,255,0.4)",
                        borderRight: idx < yearOptions.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      {year.label}
                    </button>
                  );
                })}
              </div>

              {/* Desktop: 3D drum selector */}
              <div
                ref={drumRef}
                className="hidden md:flex items-center relative h-[380px] w-full max-w-[280px] bg-white/[0.01] border border-white/[0.08] rounded-2xl overflow-hidden px-4 select-none touch-none"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Focus Overlay Windows (Slot machine brackets) */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[68px] border-t border-b border-[#ff8c00]/30 bg-[#ff8c00]/[0.02] pointer-events-none" />
                
                {/* Side Pointer notch */}
                <div className="absolute left-2 w-1.5 h-1.5 rounded-full bg-[#ff8c00] shadow-[0_0_6px_#ff8c00]" />
                <div className="absolute left-2.5 w-4 h-[1px] bg-[#ff8c00]" />

                {/* Scroll Help Hint */}
                <div className="absolute right-4 bottom-3 text-[9px] font-mono text-neutral-600 tracking-wider pointer-events-none uppercase">
                  Scroll / Click
                </div>

                {/* Drum list */}
                <div className="relative w-full h-full flex flex-col justify-center items-start">
                  {yearOptions.map((year, idx) => {
                    const diff = idx - activeIndex;
                    const isActive = diff === 0;
                    
                    // 3D cylindrical slot drum coordinates (expanded spacing and angle)
                    const transY = diff * 64; 
                    const rotX = diff * -24;  
                    const scale = isActive ? 1.08 : 1 - Math.min(Math.abs(diff) * 0.15, 0.3);
                    const opacity = isActive ? 1 : 1 - Math.min(Math.abs(diff) * 0.45, 0.85);

                    return (
                      <button
                        key={year.key}
                        onClick={() => setSelectedYear(year.key)}
                        className="absolute left-6 font-mono text-left tracking-widest uppercase transition-all duration-500 ease-out cursor-pointer focus:outline-none flex items-center gap-3 py-1"
                        style={{
                          transform: `translateY(${transY}px) rotateX(${rotX}deg) translateZ(${isActive ? "15px" : "0px"})`,
                          scale: `${scale}`,
                          opacity: opacity,
                          fontSize: isActive ? "clamp(1.2rem, 2vw, 1.8rem)" : "clamp(0.95rem, 1.5vw, 1.25rem)",
                          transformOrigin: "left center",
                          transformStyle: "preserve-3d",
                          height: "56px",
                          zIndex: 10 - Math.abs(diff)
                        }}
                      >
                        <span className={`transition-colors duration-500 ${isActive ? "text-[#ff8c00] font-black" : "text-neutral-500 hover:text-neutral-300"}`}>
                          {year.label}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#ff8c00] shadow-[0_0_8px_#ff8c00] animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: scrolls independently on desktop */}
          <main ref={gridPanelRef} className="flex-1 w-full md:overflow-y-auto md:py-10 pb-12 fleet-grid-section opacity-0">
            <FleetGrid selectedYear={selectedYear} onOpen3D={setSelected3DDrone} />
          </main>

        </div>
      </div>

      {/* Desktop-only footer — App.jsx footer handles mobile */}
      <div className="hidden md:block">
        <SiteFooter />
      </div>

      {selected3DDrone && (
        <Drone3DModal
          isOpen={!!selected3DDrone}
          onClose={() => setSelected3DDrone(null)}
          drone={selected3DDrone}
        />
      )}
    </div>
  );
};

export default Fleet;
