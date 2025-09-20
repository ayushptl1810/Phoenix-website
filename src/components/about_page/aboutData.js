import teamPhoto from "../../assets/team.jpeg";
import ANSYS from "../../assets/Sponsors/ANSYS_logo.png";
import Ethix from "../../assets/Sponsors/Ethixlogo.png";
import SolidWorks from "../../assets/Sponsors/SolidWorks_Logo.png";
import Techmentry from "../../assets/Sponsors/Techmentrylogo.png";

export const aboutHero = {
  title: "About DJS Phoenix",
  subtitle: "#BEYOND GRAVITY",
  image: teamPhoto,
};

export const storyParagraphs = [
  "DJS Phoenix is the official student drone team of SVKM’s Dwarkadas J. Sanghvi College of Engineering. We design, develop, and perfect high-performance unmanned aerial systems from scratch, uniting technical expertise with a vision for innovation in aerospace.",
  "Each year, we showcase our work at prestigious competitions like SAE Aerothon, ISRO IROC and national-level drone challenges where our creations compete against the best on a global platform.",
  "From airframe design and propulsion to avionics, controls, and autonomous systems, every module is engineered with precision, creativity, and dedication — carrying forward the spirit of Indian ingenuity into the future of aerial robotics.",
  "Our process spans rapid prototyping, rigorous bench testing, and iterative flight validation. We emphasize safety, documentation and reproducibility so improvements compound season after season.",
  "We also invest in training and mentorship to onboard new members quickly, sharing standards, tools and best practices across mechanical, electronics and coding so the team scales sustainably.",
];

export const departments = [
  {
    iconKey: "mechanical",
    title: "Mechanical",
    description:
      "The Mechanical Department designs the drone structure — plates, arms, landing gear, mounts and more — using SolidWorks and AutoCAD. Designs follow competition requirements and mission stresses.\n\n• Calculations: arm bending, center of gravity (all axes), moments, balancing, dimensions, UAV sizing.\n• Analyses with ANSYS and SolidWorks to validate integrity and effectiveness.\n• Manufacturing: material procurement, 3D printing and laser cutting for efficient, economical builds.\n• Training on SolidWorks, ANSYS, AutoCAD, MATLAB and Ultimaker Cura with hands-on design practice.",
  },
  {
    iconKey: "electronics",
    title: "Electronics",
    description:
      "The Elex department powers, controls and connects our drones — from precision flight to real-time communication. We build what gives drones intelligence and stability.\n\n• Integrate sensors: GPS, IMU, LiDAR and camera modules.\n• Configure propulsion systems: motors, ESCs and power setups.\n• Work with batteries, voltage regulators and power modules.\n• Solder, test and debug real hardware.\n• Set up telemetry and communication (e.g., HC-12).\n• Use Mission Planner to tune and monitor in real time.\n\nWe also explore cutting-edge innovations: designing indigenous custom flight controllers and PCBs, and publishing research to share our work with the community.",
  },
  {
    iconKey: "coding",
    title: "Coding",
    description:
      "The Coding Department develops software for autonomous flight and perception.\n\n• Python scripts for flight control (e.g., pymavlink) and mission logic.\n• Vision pipelines in OpenCV for object detection and safe landing spot identification.\n• ROS to orchestrate communication between modules for a modular, efficient system.\n• ArduPilot SITL to simulate without hardware; Unreal Engine for realistic scenarios.\n• Training on pymavlink, MAVSDK, OpenCV, ROS, Unreal Engine and ArduPilot SITL.",
  },
  {
    iconKey: "marketing",
    title: "Marketing",
    description:
      "Creatives & Marketing\n\n• Public relations, branding and promotional activities for competitions and online platforms.\n• Creatives: presentations, promotional videos and all visual content to represent the team.\n• Marketing: sponsorships and funding — outreach, client relationships and agreement handling.\n• Social media on Instagram, LinkedIn, Facebook and YouTube — posts, reels, videos and stories.\n• Learn tools like Canva and professional video editors.\n• Learn sponsor outreach: cold emails/calls, building a marketing database and converting leads.",
  },
];

export const stats = [
  {
    label: "Dedicated Team Members",
    iconKey: "users",
    target: 40,
    suffix: "+",
  },
  { label: "Competitions Won", iconKey: "trophy", target: 8 },
  { label: "Events Participated", iconKey: "drone", target: 15, suffix: "+" },
];

export const sponsors = [
  { src: ANSYS, alt: "ANSYS" },
  { src: SolidWorks, alt: "SolidWorks" },
  { src: Ethix, alt: "Ethix" },
  { src: Techmentry, alt: "Techmentry" },
];
