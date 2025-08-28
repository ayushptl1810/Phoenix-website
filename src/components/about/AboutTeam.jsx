import React from "react";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { PiDroneFill } from "react-icons/pi"; // 'luc' for Lucide pack
import teamPhoto from "../../assets/team.jpeg";

const AboutTeam = () => {
  return (
    <section className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Team Description */}
          <div className="space-y-8">
            {/* Mission Statement */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-white">
                Our
                <span className="text-[#ff8c00]"> Mission</span>
              </h2>
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                DJS Phoenix is a student-led drone innovation team dedicated to
                pushing the boundaries of aerial robotics. We combine
                cutting-edge technology with creative problem-solving to tackle
                real-world challenges in agriculture, environmental monitoring,
                and autonomous systems.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold text-white">
                Vision
              </h3>
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                To become a leading force in drone technology innovation,
                fostering the next generation of aerospace engineers and
                creating solutions that make a positive impact on society and
                the environment.
              </p>
            </div>

            {/* Key Stats - Professional Design */}
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-semibold text-white">
                Team Highlights
              </h3>

              {/* Clean Stats Layout - Horizontal */}
              <div className="grid grid-cols-3 gap-4">
                {/* Team Size */}
                <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:border-[#ff8c00]/30 hover:shadow-lg transition-all duration-200">
                  <div className="w-10 h-10 bg-[#ff8c00]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaUsers className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <div className="font-ui font-bold text-2xl text-white mb-1">
                    40+
                  </div>
                  <div className="font-body text-sm text-gray-400">
                    Team Members
                  </div>
                </div>

                {/* Competitions Won */}
                <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:border-[#ff8c00]/30 hover:shadow-lg transition-all duration-200">
                  <div className="w-10 h-10 bg-[#ff8c00]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaTrophy className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <div className="font-ui font-bold text-2xl text-white mb-1">
                    8
                  </div>
                  <div className="font-body text-sm text-gray-400">
                    Competitions Won
                  </div>
                </div>

                {/* Participated In */}
                <div className="text-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:border-[#ff8c00]/30 hover:shadow-lg transition-all duration-200">
                  <div className="w-10 h-10 bg-[#ff8c00]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <PiDroneFill className="w-5 h-5 text-[#ff8c00]" />
                  </div>
                  <div className="font-ui font-bold text-2xl text-white mb-1">
                    15+
                  </div>
                  <div className="font-body text-sm text-gray-400">
                    Participated In
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="px-8 py-4 bg-[#ff8c00] text-white font-ui font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ff8c00]/25">
                Learn More About Our Team
              </button>
            </div>
          </div>

          {/* Right Side - Team Photo & Visual Elements */}
          <div className="relative">
            {/* Team Photo */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={teamPhoto}
                alt="DJS Phoenix Team"
                className="w-full h-auto object-cover"
              />

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff8c00]/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Achievement Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border border-gray-200">
              <PiDroneFill className="w-8 h-8 text-[#ff8c00]" />
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs">
              <h4 className="font-ui font-bold text-gray-900 mb-2 text-sm">
                Latest Achievement
              </h4>
              <p className="font-ui font-bold text-[#ff8c00] text-sm">
                ISRO IROC 2025 Finalists
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
