import React, { useMemo } from "react";
import DroneCard from "./DroneCard";

// Load media from assets/Fleet
const mediaMap = (() => {
  try {
    const files = import.meta.glob("../../assets/Fleet/*.{png,jpg,jpeg,webp}", {
      eager: true,
      query: "?url",
      import: "default",
    });
    return Object.fromEntries(
      Object.entries(files).map(([path, url]) => [path.split("/").pop(), url])
    );
  } catch (e) {
    return {};
  }
})();

// Temporary data builder (replace with real specs later)
const defaultDrones = [
  // Two current (XL)
  {
    id: "current-1",
    name: "Phoenix X1",
    status: "current",
    type: "Racing",
    image: mediaMap["Drone1.jpg"] || mediaMap["Drone1.png"],
    specs: { endurance: "9 min", range: "2 km", maxSpeed: "120 km/h" },
    highlightScore: 100,
  },
  {
    id: "current-2",
    name: "Phoenix X2",
    status: "current",
    type: "Racing",
    image: mediaMap["Drone2.png"] || mediaMap["Drone2.jpg"],
    specs: { endurance: "11 min", range: "2.5 km", maxSpeed: "130 km/h" },
    highlightScore: 95,
  },
  // Retired (M)
  {
    id: "retired-1",
    name: "Phoenix R1",
    status: "retired",
    type: "Racing",
    image: mediaMap["Drone3.jpg"],
    specs: { endurance: "8 min", range: "1.5 km", maxSpeed: "110 km/h" },
  },
  {
    id: "retired-2",
    name: "Phoenix R2",
    status: "retired",
    type: "Racing",
    image: mediaMap["Drone4.png"],
    specs: { endurance: "7 min", range: "1.2 km", maxSpeed: "105 km/h" },
  },
  {
    id: "retired-3",
    name: "Phoenix R3",
    status: "retired",
    type: "Surveillance",
    image: mediaMap["Drone5.png"],
    specs: { endurance: "25 min", range: "3.5 km", maxSpeed: "60 km/h" },
  },
  {
    id: "retired-4",
    name: "Phoenix R4",
    status: "retired",
    type: "Racing",
    image: mediaMap["Drone6.jpeg"],
    specs: { endurance: "8 min", range: "1.8 km", maxSpeed: "108 km/h" },
  },
  {
    id: "retired-5",
    name: "Phoenix R5",
    status: "retired",
    type: "Racing",
    image: mediaMap["Drone7.jpg"],
    specs: { endurance: "9 min", range: "2.0 km", maxSpeed: "112 km/h" },
  },
  // WIP examples
  {
    id: "wip-1",
    name: "Courier PX",
    status: "current",
    type: "Package Delivery",
    image: mediaMap["Drone8.jpg"] || mediaMap["Drone8.png"],
    specs: { payload: "2 kg", endurance: "N/A", range: "N/A" },
    wip: true,
    highlightScore: 80,
  },
  {
    id: "wip-2",
    name: "Recon XR",
    status: "retired",
    type: "Recon",
    image: mediaMap["Drone9.jpg"] || mediaMap["Drone9.png"],
    specs: { sensor: "Thermal", endurance: "N/A", range: "N/A" },
    wip: true,
  },
];

const FleetGrid = ({ filters = { statuses: [], types: [] } }) => {
  const drones = useMemo(() => {
    let list = defaultDrones;
    const activeStatuses = (filters.statuses || []).map((s) => s.toLowerCase());
    const activeTypes = filters.types || [];
    if (activeStatuses.length > 0) {
      list = list.filter((d) => activeStatuses.includes(d.status));
    }
    if (activeTypes.length > 0) {
      list = list.filter((d) => activeTypes.includes(d.type));
    }
    // sort: current (highlight) first
    return list
      .slice()
      .sort((a, b) => (b.highlightScore || 0) - (a.highlightScore || 0));
  }, [filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {drones.map((d) => (
        <DroneCard key={d.id} drone={d} />
      ))}
    </div>
  );
};

export default FleetGrid;
