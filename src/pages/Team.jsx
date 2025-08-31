import React from "react";
import { ExpandableCardDemo } from "../components/team/ExpandableCardDemo";

const Team = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="text-orange-200">Our Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Meet the brilliant minds behind Phoenix Drones' innovative technology and groundbreaking research
          </p>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Core <span className="text-orange-500">Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The founding members and senior leadership driving our vision forward
            </p>
          </div>
          
          <ExpandableCardDemo cardType="core" />
        </div>
      </section>

      {/* Junior Core Team Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Junior <span className="text-orange-500">Core</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rising talents and dedicated contributors shaping the future of Phoenix Drones
            </p>
          </div>
          
          <ExpandableCardDemo cardType="junior" />
        </div>
      </section>

      
    </div>
  );
};

export default Team;
