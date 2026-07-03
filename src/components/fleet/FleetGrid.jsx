import React, { useMemo } from "react";
import { motion } from "framer-motion";
import DroneCard from "./DroneCard";
import { defaultDrones } from "./DroneData";

const FleetGrid = ({ selectedYear = "2025-2026", onOpen3D }) => {
  const drones = useMemo(() => {
    // Filter by selected year
    let list = defaultDrones.filter((d) => d.year === selectedYear);

    // Sort by highlight score if available, preserving array order
    return list.slice().sort((a, b) => {
      return (b.highlightScore || 0) - (a.highlightScore || 0);
    });
  }, [selectedYear]);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
      key={selectedYear}
    >
      {drones.map((d, index) => (
        <DroneCard key={d.id} drone={d} index={index} onOpen3D={() => onOpen3D(d)} />
      ))}
    </div>
  );
};

export default FleetGrid;
