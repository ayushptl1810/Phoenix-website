import React, { useMemo } from "react";
import { motion } from "framer-motion";
import DroneCard from "./DroneCard";
import { defaultDrones } from "./DroneData";

// Temporary data builder (replace with real specs later)

const FleetGrid = ({ selectedYear = "2024-2025" }) => {
  const drones = useMemo(() => {
    // Filter by selected year
    let list = defaultDrones.filter((d) => d.year === selectedYear);

    // Sort: current (highlight) first, then by highlight score
    return list.slice().sort((a, b) => {
      // Current status first
      if (a.status === "current" && b.status !== "current") return -1;
      if (a.status !== "current" && b.status === "current") return 1;

      // Then by highlight score
      return (b.highlightScore || 0) - (a.highlightScore || 0);
    });
  }, [selectedYear]);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {drones.map((d, index) => (
        <DroneCard key={d.id} drone={d} index={index} />
      ))}
    </motion.div>
  );
};

export default FleetGrid;
