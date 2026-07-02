import guddu3DConfig from "./metadata/guddu.json";
import rhino3DConfig from "./metadata/rhino.json";
import aerothon20263DConfig from "./metadata/aerothon2026.json";
import ares3DConfig from "./metadata/ares.json";

// Load media from assets/Fleet
const mediaMap = (() => {
  try {
    const files = import.meta.glob("../../assets/Fleet/*.{png,jpg,jpeg,webp}", {
      eager: true,
      query: "?url",
      import: "default",
    });
    return Object.fromEntries(
      Object.entries(files).map(([path, url]) => [path.split("/").pop(), url]),
    );
  } catch (e) {
    return {};
  }
})();

export const defaultDrones = [
  // 2024-2025 Drones
  {
    id: "current-1",
    name: "Sonic",
    type: "Racing",
    year: "2024-2025",
    image: mediaMap["Sonic.jpeg"],
    specs: { endurance: "11 min", range: "2.5 km", maxSpeed: "130 km/h" },
    highlightScore: 95,
  },
  {
    id: "current-4",
    name: "Guddu",
    type: "Recon",
    year: "2024-2025",
    image: mediaMap["Guddu.jpeg"],
    specs: { endurance: "8 min", range: "1.8 km", maxSpeed: "108 km/h" },
    has3DModel: true,
    ...guddu3DConfig,
  },
  {
    id: "rhino-2025",
    name: "Rhino",
    type: "Heavy Lift",
    year: "2024-2025",
    image: mediaMap["Rhino.jpeg"],
    specs: { payload: "3.5 kg", endurance: "15 min", range: "4 km" },
    has3DModel: true,
    ...rhino3DConfig,
  },
  {
    id: "aerothon-2026",
    name: "Mario",
    type: "Autonomous Recon",
    year: "2025-2026",
    image: mediaMap["Mario.jpeg"],
    specs: { endurance: "In Development", range: "In Development" },
    has3DModel: true,
    ...aerothon20263DConfig,
  },
  {
    id: "current-5",
    name: "Shadow",
    type: "Racing",
    year: "2025-2026",
    image: mediaMap["Shadow.jpeg"],
    specs: { endurance: "11 min", range: "2.5 km", maxSpeed: "130 km/h" },
    highlightScore: 95,
  },
  {
    id: "wip-1",
    name: "Hexa",
    type: "Package Delivery",
    year: "2025-2026",
    image: mediaMap["Hexa.jpeg"],
    specs: { payload: "2 kg", endurance: "N/A", range: "N/A" },
    highlightScore: 80,
  },
  {
    id: "wip-2",
    name: "Ares",
    type: "VTOL Recon",
    year: "2025-2026",
    image: mediaMap["Ares.jpeg"],
    specs: { sensor: "Thermal Camera", endurance: "45 min", range: "10 km" },
    has3DModel: true,
    ...ares3DConfig,
  },
  // Pre-2024 Drones
  {
    id: "retired-1",
    name: "Phoenix R1",
    type: "Racing",
    year: "pre-2024",
    image: mediaMap["Drone3.jpg"],
    specs: { endurance: "8 min", range: "1.5 km", maxSpeed: "110 km/h" },
  },
  {
    id: "retired-2",
    name: "Phoenix R2",
    type: "Racing",
    year: "pre-2024",
    image: mediaMap["Drone4.png"],
    specs: { endurance: "7 min", range: "1.2 km", maxSpeed: "105 km/h" },
  },
  {
    id: "retired-3",
    name: "Phoenix R3",
    type: "Racing",
    year: "pre-2024",
    image: mediaMap["Drone5.png"],
    specs: { endurance: "25 min", range: "3.5 km", maxSpeed: "60 km/h" },
  },
  {
    id: "retired-4",
    name: "Phoenix R4",
    type: "Racing",
    year: "pre-2024",
    image: mediaMap["Drone1.jpg"] || mediaMap["Drone1.png"],
    specs: { endurance: "9 min", range: "2 km", maxSpeed: "120 km/h" },
    highlightScore: 100,
  },
];
