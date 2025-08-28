import React from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaRocket,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";

const CompetitionsSection = () => {
  const competitions = [
    {
      id: 1,
      name: "NIDAR",
      status: "upcoming",
      date: "November 2025",
      description:
        "Hosted by the Ministry of Electronics and Information Technology (MeitY) and Drone Federation India (DFI) under the SwaYaan initiative.",
      category: "Disaster Management",
      icon: FaRocket,
    },
    {
      id: 2,
      name: "SAE Aerothon",
      status: "upcoming",
      date: "November 2025",
      description:
        "SAEINDIA's flagship event supporting the Indian government's mission to make India a UAS/Drone hub by 2030 under the AatmaNirbhar Bharat Abhiyan",
      category: "Surveillance and Disaster Management",
      icon: FaRocket,
    },
    {
      id: 3,
      name: "ISRO IROC 2025",
      status: "completed",
      date: "August 2025",
      description:
        "Indian Space Research Organisation's Innovation Challenge for safe spot detection on the Martian surface",
      category: "Space Technology",
      icon: FaTrophy,
      achievement: "Finalist",
    },
    {
      id: 4,
      name: "Drone Dexterity 2025",
      status: "completed",
      date: "March 2025",
      description: "Obstacle avoidance and racing competition",
      category: "Racing",
      icon: FaTrophy,
      achievement: "2nd Place",
    },
  ];

  const completedCount = competitions.filter(
    (c) => c.status === "completed"
  ).length;
  const totalCount = competitions.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <section className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#ff8c00] rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-[#ff8c00] transform rotate-45"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-[#ff8c00] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-[#ff8c00] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            This Year's
            <span className="text-[#ff8c00]"> Competitions</span>
          </h2>
          <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our journey through innovation challenges and
            technological breakthroughs
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-105 ${
                competition.status === "completed"
                  ? "bg-gradient-to-br from-green-900/20 to-emerald-800/20 border-green-500/30 hover:border-green-400/50"
                  : "bg-gradient-to-br from-blue-900/20 to-indigo-800/20 border-blue-500/30 hover:border-blue-400/50"
              }`}
            >
              {/* Status Badge */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-ui font-bold ${
                  competition.status === "completed"
                    ? "bg-green-500/20 text-green-400 border border-green-400/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                }`}
              >
                {competition.status === "completed" ? (
                  <span className="flex items-center space-x-1">
                    <FaCheckCircle className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <FaClock className="w-3 h-3" />
                    <span>Upcoming</span>
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      competition.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    <competition.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {competition.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mb-3">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{competition.date}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>{competition.category}</span>
                    </div>
                  </div>
                </div>

                <p className="font-body text-gray-300 mb-4 leading-relaxed">
                  {competition.description}
                </p>

                {/* Achievement Badge for Completed */}
                {competition.achievement && (
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
                    <GiLaurelCrown className="w-4 h-4 text-green-400" />
                    <span className="font-ui font-bold text-green-400 text-sm">
                      {competition.achievement}
                    </span>
                  </div>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  competition.status === "completed"
                    ? "bg-gradient-to-r from-green-500/5 to-emerald-500/5"
                    : "bg-gradient-to-r from-blue-500/5 to-indigo-500/5"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
