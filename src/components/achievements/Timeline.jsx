import React, { useMemo, useRef, useState, useEffect } from "react";
import TimelineCard from "./TimelineCard";
import { motion, useScroll, useTransform } from "framer-motion";

const Timeline = () => {
  const [activeCategories, setActiveCategories] = useState(new Set(["All"]));
  const containerRef = useRef(null);
  const timelineAreaRef = useRef(null);
  const [activeYear, setActiveYear] = useState(null);
  const [completedYears, setCompletedYears] = useState(new Set());
  const [completedRings, setCompletedRings] = useState(new Set());
  const [ringRatios, setRingRatios] = useState({}); // id -> ratio 0..1
  const [yearRatios, setYearRatios] = useState({}); // year -> ratio 0..1
  const [maxProgress, setMaxProgress] = useState(0); // persist line fill

  // Sample achievement data with multiple competitions per year
  const achievements = [
    {
      year: 2017,
      achievements: [
        {
          id: 1,
          title: "Team Founded",
          description:
            "DJS PHOENIX was established with a vision to revolutionize drone racing and innovation.",
          date: "September 2017",
          category: "Foundation",
          icon: "🚁",
          status: "completed",
        },
      ],
    },
    {
      year: 2018,
      achievements: [
        {
          id: 2,
          title: "First Racing Competition",
          description:
            "Participated in our first drone racing competition, learning valuable lessons about teamwork and technical skills.",
          date: "March 2018",
          category: "Racing",
          icon: "🏁",
          status: "completed",
        },
        {
          id: 3,
          title: "Technical Workshop",
          description:
            "Organized our first technical workshop to improve drone building and flying skills.",
          date: "August 2018",
          category: "Training",
          icon: "🔧",
          status: "completed",
        },
      ],
    },
    {
      year: 2019,
      achievements: [
        {
          id: 4,
          title: "Innovation Award",
          description:
            "Won the Innovation Award at TechFest for our custom drone design and control system.",
          date: "November 2019",
          category: "Innovation",
          icon: "💡",
          status: "completed",
        },
        {
          id: 5,
          title: "Regional Racing League",
          description:
            "Participated in the Regional Racing League, finishing in the top 5.",
          date: "December 2019",
          category: "Racing",
          icon: "🏁",
          status: "completed",
        },
      ],
    },
    {
      year: 2020,
      achievements: [
        {
          id: 6,
          title: "National Recognition",
          description:
            "Featured in Drone Racing Magazine for our innovative approach to drone design and racing strategy.",
          date: "July 2020",
          category: "Recognition",
          icon: "📰",
          status: "completed",
        },
        {
          id: 7,
          title: "Virtual Competition",
          description:
            "Adapted to virtual competitions during challenging times, maintaining team spirit and skills.",
          date: "October 2020",
          category: "Innovation",
          icon: "💻",
          status: "completed",
        },
      ],
    },
    {
      year: 2021,
      achievements: [
        {
          id: 8,
          title: "Regional Champions",
          description:
            "Secured first place in the Regional Drone Racing Championship, defeating teams from across the state.",
          date: "October 2021",
          category: "Racing",
          icon: "🏆",
          status: "completed",
        },
        {
          id: 9,
          title: "Technical Symposium",
          description:
            "Presented our research at the National Technical Symposium on Drone Technology.",
          date: "December 2021",
          category: "Research",
          icon: "📚",
          status: "completed",
        },
      ],
    },
    {
      year: 2022,
      achievements: [
        {
          id: 10,
          title: "Technical Breakthrough",
          description:
            "Developed a revolutionary flight control algorithm that improved our drones' performance by 40%.",
          date: "March 2022",
          category: "Innovation",
          icon: "⚡",
          status: "completed",
        },
        {
          id: 11,
          title: "Inter-College Championship",
          description:
            "Won the Inter-College Drone Racing Championship, showcasing our technical superiority.",
          date: "June 2022",
          category: "Racing",
          icon: "🏆",
          status: "completed",
        },
      ],
    },
    {
      year: 2023,
      achievements: [
        {
          id: 12,
          title: "International Competition",
          description:
            "Represented our country in the International Drone Racing Championship, finishing in the top 10.",
          date: "September 2023",
          category: "International",
          icon: "🌍",
          status: "completed",
        },
        {
          id: 13,
          title: "Innovation Summit",
          description:
            "Presented our latest innovations at the Global Drone Innovation Summit.",
          date: "November 2023",
          category: "Innovation",
          icon: "🚀",
          status: "completed",
        },
      ],
    },
    {
      year: 2024,
      achievements: [
        {
          id: 14,
          title: "SAE Aero Design 2024",
          description:
            "Ranked 5th Overall in the prestigious SAE Aero Design competition, showcasing our engineering excellence.",
          date: "April 2024",
          category: "Competition",
          icon: "✈️",
          status: "completed",
        },
        {
          id: 15,
          title: "NIDAR Championship",
          description:
            "Secured 3rd place in the National Inter-College Drone Racing Championship, demonstrating our racing prowess.",
          date: "June 2024",
          category: "Racing",
          icon: "🏁",
          status: "completed",
        },
        {
          id: 16,
          title: "ISRO IROC",
          description:
            "Participated in the prestigious ISRO IROC competition, reaching the final round.",
          date: "August 2024",
          category: "Competition",
          icon: "🛰️",
          status: "completed",
        },
      ],
    },
  ];

  const primaryCategoryOrder = [
    "Competition",
    "Racing",
    "Innovation",
    "Research",
    "International",
  ];
  const allCategories = useMemo(() => {
    const present = new Set();
    achievements.forEach((y) =>
      y.achievements.forEach((a) => present.add(a.category))
    );
    const filtered = primaryCategoryOrder.filter((c) => present.has(c));
    return ["All", ...filtered];
  }, [achievements]);

  const filtered = useMemo(() => {
    if (activeCategories.has("All")) return achievements;
    return achievements
      .map((year) => ({
        ...year,
        achievements: year.achievements.filter((a) =>
          activeCategories.has(a.category)
        ),
      }))
      .filter((y) => y.achievements.length > 0);
  }, [achievements, activeCategories]);

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (cat === "All") return new Set(["All"]);
      next.delete("All");
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      if (next.size === 0) return new Set(["All"]);
      return next;
    });
  };

  // Scrollspy for active year (kept for rail highlight)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const yr = entry.target.getAttribute("data-year");
            setActiveYear(Number(yr));
          }
        });
      },
      { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );
    const sections = document.querySelectorAll("[data-year]");
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Framer Motion scroll progress for center line following viewport center
  const { scrollYProgress } = useScroll({
    target: timelineAreaRef,
    offset: ["start center", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Persist max progress so the line doesn't shrink on scroll up
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setMaxProgress((prev) => (v > prev ? v : prev));
    });
    return () => unsub && unsub();
  }, [scrollYProgress]);

  // Compute element ratios relative to the timeline area
  useEffect(() => {
    const computeRatios = () => {
      const area = timelineAreaRef.current;
      if (!area) return;
      const total =
        area.scrollHeight || area.getBoundingClientRect().height || 1;
      const areaTop = area.getBoundingClientRect().top + window.scrollY;

      const ringNodes = area.querySelectorAll("[data-ring-id]");
      const ringMap = {};
      ringNodes.forEach((node) => {
        const id = Number(node.getAttribute("data-ring-id"));
        const top = node.getBoundingClientRect().top + window.scrollY;
        const ratio = Math.min(1, Math.max(0, (top - areaTop) / total));
        ringMap[id] = ratio;
      });

      const yearNodes = area.querySelectorAll("[data-year]");
      const yearMap = {};
      yearNodes.forEach((node) => {
        const yr = Number(node.getAttribute("data-year"));
        const top = node.getBoundingClientRect().top + window.scrollY;
        const ratio = Math.min(1, Math.max(0, (top - areaTop) / total));
        yearMap[yr] = ratio;
      });

      setRingRatios(ringMap);
      setYearRatios(yearMap);
    };

    computeRatios();
    window.addEventListener("resize", computeRatios);
    // recalc after images load
    const t = setTimeout(computeRatios, 300);
    return () => {
      window.removeEventListener("resize", computeRatios);
      clearTimeout(t);
    };
  }, []);

  // Tie completions to scroll progress following the center line
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const epsilon = 0.005; // small lead so it feels responsive
      // Rings
      const newRings = new Set(completedRings);
      Object.entries(ringRatios).forEach(([id, ratio]) => {
        if (v + epsilon >= ratio) newRings.add(Number(id));
      });
      if (newRings.size !== completedRings.size) setCompletedRings(newRings);

      // Years
      const newYears = new Set(completedYears);
      Object.entries(yearRatios).forEach(([yr, ratio]) => {
        if (v + epsilon >= ratio) newYears.add(Number(yr));
      });
      if (newYears.size !== completedYears.size) setCompletedYears(newYears);
    });
    return () => unsub && unsub();
  }, [scrollYProgress, ringRatios, yearRatios, completedRings, completedYears]);

  // Card motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  };

  const scrollToYear = (year) => {
    const el = document.getElementById(`year-${year}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visibleYears = useMemo(
    () => filtered.map((y) => ({ year: y.year, count: y.achievements.length })),
    [filtered]
  );

  return (
    <div className="relative" ref={containerRef}>
      {/* Filters - chip style with extra gap */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {allCategories.map((cat) => {
          const isActive = activeCategories.has(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer ${
                isActive
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-800/70 text-gray-300 border-gray-700 hover:border-orange-500/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
        <span className="ml-2 text-xs text-gray-400">
          Showing {filtered.reduce((n, y) => n + y.achievements.length, 0)}{" "}
          items
        </span>
      </div>

      {/* Rail + Timeline layout */}
      <div className="relative flex gap-12">
        {/* Sticky Year Rail */}
        <div className="hidden md:block w-48 pr-2">
          <div className="sticky top-20 space-y-4">
            {visibleYears.map(({ year, count }) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className={`w-full text-left rounded-2xl border transition-all overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-b from-orange-500/15 to-orange-600/10 border-orange-500/60"
                      : "bg-gray-800/60 border-gray-700 hover:border-orange-500/40"
                  }`}
                >
                  <div className="h-full flex flex-col justify-center px-5 py-2">
                    <div className="text-1xl font-extrabold text-white tracking-tight">
                      {year}
                    </div>
                    <div className="mt-1 text-sm text-gray-300">
                      {count} achievements
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Area (self-contained for centered line) */}
        <div className="relative flex-1 pl-4" ref={timelineAreaRef}>
          {/* Central Timeline Line: base + progress fill overlay (Framer Motion) */}
          <div className="absolute left-1/2 transform translate-x-1.75 w-0.5 bg-gray-700/60 h-full rounded-full"></div>
          <motion.div
            className="absolute left-1/2 transform translate-x-1.75 w-0.5 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-600 rounded-full"
            style={{
              height: `${Math.max(0, Math.min(1, maxProgress)) * 100}%`,
              top: 0,
            }}
          />

          {/* Timeline Content */}
          <div className="relative z-10">
            {filtered.map((yearGroup) => (
              <div
                key={yearGroup.year}
                className="relative mb-16"
                data-year={yearGroup.year}
                id={`year-${yearGroup.year}`}
              >
                {/* Central glow under year header */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-40 h-40 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

                {/* Year Header with Horizontal Lines (animated with completion) */}
                <div className="relative flex justify-center mb-6">
                  <div className="relative flex items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: completedYears.has(yearGroup.year) ? 128 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "linear" }}
                      className="h-0.5 bg-gradient-to-r from-transparent to-gray-600"
                    />
                    <motion.div
                      initial={{
                        scale: 0.98,
                        boxShadow: "0 0 0 0 rgba(255,140,0,0)",
                      }}
                      animate={{
                        scale: completedYears.has(yearGroup.year) ? 1 : 0.98,
                        boxShadow: completedYears.has(yearGroup.year)
                          ? "0 0 40px 0 rgba(255,140,0,0.15)"
                          : "0 0 0 0 rgba(255,140,0,0)",
                      }}
                      transition={{ duration: 0.4, ease: "linear" }}
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 border-4 border-gray-800 flex items-center justify-center shadow-2xl shadow-orange-500/50 mx-4"
                    >
                      <span className="text-2xl font-bold text-white">
                        {yearGroup.year}
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: completedYears.has(yearGroup.year) ? 128 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "linear" }}
                      className="h-0.5 bg-gradient-to-l from-transparent to-gray-600"
                    />
                  </div>
                </div>

                {/* Achievements for this year - alternating sides using 2-col grid */}
                <div className="grid grid-cols-2 gap-y-5">
                  {yearGroup.achievements.map(
                    (achievement, achievementIndex) => (
                      <div
                        key={achievement.id}
                        className="relative col-span-2 grid grid-cols-2"
                      >
                        {/* Center ring on the vertical line (follow center-line progress) */}
                        <motion.span
                          data-ring-id={achievement.id}
                          initial={{
                            backgroundColor: "rgba(0,0,0,0)",
                            borderColor: "rgba(255,140,0,0.5)",
                          }}
                          animate={{
                            backgroundColor: completedRings.has(achievement.id)
                              ? "rgba(255,140,0,0.9)"
                              : "rgba(0,0,0,0)",
                            borderColor: completedRings.has(achievement.id)
                              ? "rgba(255,140,0,1)"
                              : "rgba(255,140,0,0.5)",
                          }}
                          transition={{ duration: 0.25, ease: "linear" }}
                          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-30 block w-5 h-5 rounded-full border-2"
                        />
                        {achievementIndex % 2 === 0 ? (
                          <>
                            <div></div>
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              whileInView="show"
                              viewport={{
                                once: true,
                                amount: 0.5,
                                margin: "-20% 0px -20% 0px",
                              }}
                              transition={{
                                duration: 0.36,
                                delay: 0.06 + achievementIndex * 0.04,
                                ease: "linear",
                              }}
                              className="flex justify-start pl-20"
                            >
                              <div className="w-150">
                                <TimelineCard
                                  achievement={achievement}
                                  delay={0}
                                />
                              </div>
                            </motion.div>
                          </>
                        ) : (
                          <>
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              whileInView="show"
                              viewport={{
                                once: true,
                                amount: 0.5,
                                margin: "-20% 0px -20% 0px",
                              }}
                              transition={{
                                duration: 0.36,
                                delay: 0.08 + achievementIndex * 0.04,
                                ease: "linear",
                              }}
                              className="flex justify-end pr-20"
                            >
                              <div className="w-150">
                                <TimelineCard
                                  achievement={achievement}
                                  delay={0}
                                />
                              </div>
                            </motion.div>
                            <div></div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
