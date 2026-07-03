import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaBullhorn, FaCogs, FaMicrochip, FaCode } from "react-icons/fa";

const clipLeft = "polygon(0 0, 100% 0, 85% 100%, 0% 100%)";
const clipRight = "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)";

const iconMap = {
  mechanical: FaCogs,
  electronics: FaMicrochip,
  coding: FaCode,
  marketing: FaBullhorn,
};

const Row = ({ item, index }) => {
  const isEven = index % 2 === 0; // 0-based: first row even
  const imageClip = isEven ? clipLeft : clipRight;
  const rowRef = useRef(null);

  const onEnter = () => {
    gsap.to(rowRef.current, {
      boxShadow: "0 25px 60px -20px rgba(255, 140, 0, 0.25)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(rowRef.current, {
      boxShadow: "none",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={rowRef}
      className="department-row-item opacity-0 grid grid-cols-1 md:grid-cols-2 items-stretch rounded-2xl overflow-hidden border bg-white/[0.02] backdrop-blur-xl transition-[border-color] duration-300"
      style={{ borderColor: "rgba(255, 140, 0, 0.45)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image side */}
      <div
        className={`${
          isEven ? "order-1" : "order-2"
        } relative h-full min-h-[12rem] sm:min-h-[16rem] md:min-h-[360px] lg:min-h-[420px]`}
      >
        <div
          className="absolute inset-0"
          style={{ WebkitClipPath: imageClip, clipPath: imageClip }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Content side */}
      <div className={`${isEven ? "order-2" : "order-1"} flex`}>
        <div className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#ff8c00]/20 rounded-xl flex items-center justify-center">
              {(() => {
                const key = (item.iconKey || item.title || "")
                  .toString()
                  .toLowerCase();
                const Icon = iconMap[key];
                return Icon ? (
                  <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#ff8c00]" />
                ) : null;
              })()}
            </div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {item.title}
            </h3>
          </div>
          <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const DepartmentShowcase = ({ items = [], fallbackImage }) => {
  const containerRef = useRef(null);
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];

  useGSAP(
    () => {
      // 1. Header scroll trigger
      gsap.fromTo(
        ".departments-header",
        { opacity: 0, y: -35 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".departments-header",
            start: "top 95%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );

      // 2. Rows alternate slide in
      const rows = gsap.utils.toArray(".department-row-item");
      rows.forEach((row, idx) => {
        const isLeft = idx % 2 === 0;
        gsap.fromTo(
          row,
          { opacity: 0, x: isLeft ? -70 : 70 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="departments-header opacity-0 mb-10 sm:mb-14">
          <h2
            className="font-display font-bold text-white leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            Departments Overview
          </h2>
          <p
            className="font-body text-neutral-400 max-w-lg"
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
              lineHeight: 1.65,
            }}
          >
            Four pillars that power our research, innovation and competition success.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {safeItems.map((raw, idx) => {
          const item = {
            ...raw,
            image: raw.image || fallbackImage,
          };
          return <Row key={`${item.title}-${idx}`} item={item} index={idx} />;
        })}
      </div>
    </section>
  );
};

export default DepartmentShowcase;
