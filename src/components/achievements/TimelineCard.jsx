import React, { useState } from "react";

const TimelineCard = ({ achievement, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      Foundation: "from-blue-500 to-blue-600",
      Racing: "from-green-500 to-green-600",
      Innovation: "from-purple-500 to-purple-600",
      Recognition: "from-yellow-500 to-yellow-600",
      International: "from-red-500 to-red-600",
      Competition: "from-orange-500 to-orange-600",
      Training: "from-indigo-500 to-indigo-600",
      Research: "from-teal-500 to-teal-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="group relative" style={{ animationDelay: `${delay}ms` }}>
      {/* Main Card */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer ${
          isExpanded ? "ring-2 ring-orange-500/50" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(
                  achievement.category
                )} flex items-center justify-center text-2xl shadow-lg`}
              >
                {achievement.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 leading-tight">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{achievement.date}</p>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(
                achievement.category
              )} text-white shadow-lg`}
            >
              {achievement.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
            {achievement.description}
          </p>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default TimelineCard;
