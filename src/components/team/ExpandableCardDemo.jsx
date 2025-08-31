import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { coreTeamCards, juniorCoreCards } from "./teamData";

export function ExpandableCardDemo({ cardType = "core" }) {
  const currentCards = cardType === "core" ? coreTeamCards : juniorCoreCards;

  if (cardType === "core") {
    // Simple hierarchical structure
    const captainCards = currentCards.filter(
      (card) =>
        card.description.toLowerCase().includes("captain") &&
        !card.description.toLowerCase().includes("vice")
    );
    const secondTierCards = currentCards.filter(
      (card) =>
        card.description.toLowerCase().includes("vice captain") ||
        card.description.toLowerCase().includes("technical head") ||
        card.description.toLowerCase().includes("manager")
    );
    const otherCoreMembers = currentCards.filter(
      (card) => !captainCards.includes(card) && !secondTierCards.includes(card)
    );

    const TeamCard = ({
      card,
      index,
      size = "normal",
      showBadge = false,
      tier = "",
    }) => (
      <motion.div
        key={card.title}
        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-200 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={card.src}
              alt={card.title}
              className={`w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 ${
                size === "large" ? "h-64" : size === "medium" ? "h-56" : "h-48"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Leadership Badge */}
          {showBadge && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ff8c00] to-orange-600 rounded-full p-2 shadow-lg">
              <HiSparkles className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3
            className={`font-ui font-bold text-white mb-2 ${
              size === "large" ? "text-2xl" : "text-xl"
            }`}
          >
            {card.title}
          </h3>
          <p
            className={`font-body text-[#ff8c00] font-semibold mb-6 ${
              size === "large" ? "text-base" : "text-sm"
            }`}
          >
            {card.description}
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <motion.a
              href={card.linkedinLink || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={16} />
            </motion.a>
            <motion.a
              href={card.instagramLink || "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-pink-600/20 border border-pink-600/30 rounded-lg flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram size={16} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );

    return (
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Captain - Single card centered */}
        {captainCards.length > 0 && (
          <div className="flex justify-center">
            {captainCards.map((card, index) => (
              <TeamCard
                key={card.title}
                card={card}
                index={index}
                size="large"
                showBadge={true}
              />
            ))}
          </div>
        )}

        {/* Second Tier: Vice Captain, Technical Head, Manager */}
        {secondTierCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {secondTierCards.map((card, index) => (
              <TeamCard
                key={card.title}
                card={card}
                index={index}
                size="medium"
                showBadge={true}
              />
            ))}
          </div>
        )}

        {/* Rest of Core Members */}
        {otherCoreMembers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherCoreMembers.map((card, index) => (
              <TeamCard key={card.title} card={card} index={index} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Professional layout for junior core cards
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {currentCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-200 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={card.src}
                  alt={card.title}
                  className="w-full h-40 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="font-ui font-bold text-lg text-white mb-2">
                {card.title}
              </h3>
              <p className="font-body text-[#ff8c00] font-semibold text-sm mb-6">
                {card.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <motion.a
                  href={card.linkedinLink || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin size={16} />
                </motion.a>
                <motion.a
                  href={card.instagramLink || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600/20 border border-pink-600/30 rounded-lg flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
