import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getWishlistStyles = (category) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("mechanical")) {
    return { glow: "rgba(239, 68, 68, 0.12)", hue: 0 };
  }
  if (cat.includes("electronics")) {
    return { glow: "rgba(139, 92, 246, 0.12)", hue: 265 };
  }
  if (cat.includes("coding")) {
    return { glow: "rgba(16, 185, 129, 0.12)", hue: 150 };
  }
  return { glow: "rgba(244, 63, 94, 0.12)", hue: 345 };
};

const WishlistCard = ({ group }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const style = getWishlistStyles(group.category);

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
      className="wishlist-group-item opacity-0 h-full rounded-2xl border transition-all duration-300 w-full cursor-default"
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
      <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full min-h-[200px]">
        <div>
          <div className="flex items-center justify-between gap-4 mb-5">
            <h3 className="text-white font-display text-xl sm:text-2xl font-bold">
              {group.category}
            </h3>
            <a
              href={`?supportType=In%E2%80%91Kind&interest=${encodeURIComponent(
                group.category
              )}#contact`}
              className="ui-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border border-orange-500 bg-orange-500/10 text-white hover:bg-orange-500/20 transition-all duration-300 active:scale-95 hover:scale-105"
            >
              Sponsor
            </a>
          </div>
          
          <ul className="block sm:hidden space-y-2">
            {group.items.map((it, i) => (
              <li key={group.category + i} className="text-neutral-400 text-sm leading-relaxed">
                • {it}
              </li>
            ))}
          </ul>
          
          <ul className="hidden sm:flex flex-wrap gap-2">
            {group.items.map((it, i) => (
              <li
                key={group.category + i}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:border-orange-500/40 hover:bg-white/10 hover:text-white transition-all duration-200 text-xs sm:text-sm"
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Wishlist = ({ groups }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Animate header
      gsap.fromTo(
        ".wishlist-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".wishlist-header",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate group cards in batch
      const items = gsap.utils.toArray(".wishlist-group-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
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
    <section
      ref={containerRef}
      className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12"
    >
      <div className="wishlist-header opacity-0 text-center mb-6 sm:mb-8">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          In‑Kind Wishlist
        </h2>
        <p className="font-body text-sm sm:text-base lg:text-lg text-gray-300 mt-2 px-4">
          Items and services that create immediate impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {groups.map((group) => (
          <WishlistCard key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
