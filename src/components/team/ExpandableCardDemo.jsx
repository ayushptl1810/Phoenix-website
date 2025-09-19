import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { coreTeamCards, juniorCoreCards } from "./teamData";

export function ExpandableCardDemo() {
  // Combine both core and junior core into one unified team
  const allTeamCards = [...coreTeamCards, ...juniorCoreCards];

  // Define departments/sections
  const departments = [
    { id: "leadership", name: "LEADERSHIP" },
    { id: "coding", name: "CODING" },
    { id: "mechanical", name: "MECH" },
    { id: "electronics", name: "ELEX" },
    { id: "marketing", name: "MARKETING" },
  ];

  const [activeSection, setActiveSection] = useState("leadership");

  // Filter cards based on active section
  const getFilteredCards = () => {
    return allTeamCards.filter((card) => {
      const description = card.description.toLowerCase();
      switch (activeSection) {
        case "leadership":
          return (
            description.includes("captain") ||
            description.includes("manager") ||
            description.includes("head")
          );
        case "coding":
          return (
            description.includes("coding") ||
            description.includes("software") ||
            description.includes("ai") ||
            description.includes("algorithm") ||
            description.includes("computer vision") ||
            description.includes("data analyst")
          );
        case "mechanical":
          return (
            description.includes("mechanical") ||
            description.includes("design") ||
            description.includes("manufacturing")
          );
        case "electronics":
          return (
            description.includes("electronics") ||
            description.includes("embedded") ||
            description.includes("sensor") ||
            description.includes("communication")
          );
        case "marketing":
          return (
            description.includes("marketing") ||
            description.includes("business") ||
            description.includes("operations") ||
            description.includes("coordinator")
          );
        default:
          return true;
      }
    });
  };

  const TeamCard = ({ card, index }) => (
    <motion.div
      key={card.title}
      className="group relative bg-black border border-gray-800 rounded-3xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-3 hover:scale-[1.05] transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Profile Image - Circular */}
      <div className="relative mb-8 flex justify-center">
        <div className="relative overflow-hidden rounded-full w-48 h-48">
          <img
            src={card.src}
            alt={card.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          {/* Left side - Name and Position */}
          <div className="flex-1 text-left space-y-2">
            <h3 className="font-ui font-bold text-white text-1xl">
              {card.title}
            </h3>
            <p className="font-body text-orange-400 text-sm font-medium">
              {card.description}
            </p>
          </div>

          {/* Right side - Simple LinkedIn icon */}
          <div className="flex items-center justify-center ml-4">
            <motion.a
              href={card.linkedinLink || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={40} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Clickable Sections/Filters - Underline Tab Style */}
      <div className="mb-16">
        <div className="flex justify-center">
          <div className="relative w-full max-w-7xl border-b border-gray-600 px-4">
            <div className="flex justify-between">
              {departments.map((dept, index) => (
                <motion.button
                  key={dept.id}
                  onClick={() => setActiveSection(dept.id)}
                  className={`relative pb-6 font-ui font-semibold text-lg transition-all duration-300 ${
                    activeSection === dept.id
                      ? "text-orange-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {dept.name}
                  {/* Active underline indicator - overlays on the gray border */}
                  {activeSection === dept.id && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-orange-400 min-w-[120px]"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ zIndex: 10 }} // Ensure it overlays the gray border
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {getFilteredCards().map((card, index) => (
          <TeamCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}
