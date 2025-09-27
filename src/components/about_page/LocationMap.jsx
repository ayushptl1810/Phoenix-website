import React from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMap = () => {
  const position = [19.10769408586692, 72.83770824079409];
  const address =
    "4R5Q+235, Navpada, Suvarna Nagar, Juhu, Mumbai, Maharashtra 400056";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Where to Find Us
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our workspace at DJ Sanghvi College of Engineering, Mumbai.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Address & Contact Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <HiLocationMarker className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  DJ Sanghvi College of Engineering
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-ui font-bold text-white mb-2">Address</h4>
                  <p className="font-body text-gray-300 leading-relaxed">
                    {address}
                  </p>
                </div>

                <div>
                  <h4 className="font-ui font-bold text-white mb-2">
                    Contact Information
                  </h4>
                  <div className="flex items-center gap-3">
                    <HiMail className="w-5 h-5 text-orange-400" />
                    <span className="font-body text-gray-300">
                      djsphoenixteam@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="flex-1 w-full relative">
                <MapContainer
                  center={position}
                  zoom={16}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-2xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="text-center p-2">
                        <h3 className="font-bold text-gray-800 mb-1">
                          DJS Phoenix - DJ Sanghvi College of Engineering
                        </h3>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Map overlay info */}
              <div className="p-4 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-ui font-bold text-white text-sm">
                      Coordinates
                    </h4>
                    <p className="font-body text-gray-300 text-xs">
                      {position[0].toFixed(6)}, {position[1].toFixed(6)}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${position[0]},${position[1]}`,
                        "_blank"
                      )
                    }
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-ui font-bold text-sm rounded-lg transition-colors duration-200"
                  >
                    Open in Maps
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LocationMap;
