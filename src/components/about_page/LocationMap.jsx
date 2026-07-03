import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

  const containerRef = useRef(null);
  const mapCardRef = useRef(null);
  const addressInfoRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(320);

  useEffect(() => {
    const updateHeights = () => {
      const leftHeight = addressInfoRef.current?.offsetHeight;
      if (leftHeight && Number.isFinite(leftHeight)) {
        setMapHeight(leftHeight);
      }
    };
    // Ensure height is evaluated after the initial paint cycle
    const frame = requestAnimationFrame(updateHeights);
    window.addEventListener("resize", updateHeights);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  useGSAP(
    () => {
      // 1. Header scroll trigger
      gsap.fromTo(
        ".map-header",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".map-header",
            start: "top 95%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );

      // 2. Left side card slide in
      gsap.fromTo(
        ".map-left-card",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: ".map-left-card",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // 3. Right side map card slide in
      gsap.fromTo(
        ".map-right-card",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: ".map-right-card",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  const onEnterCard = (refEl) => {
    gsap.to(refEl, {
      boxShadow: "0 25px 60px -20px rgba(255, 140, 0, 0.25)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeaveCard = (refEl) => {
    gsap.to(refEl, {
      boxShadow: "none",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section ref={containerRef} className="py-12 sm:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="map-header opacity-0 mb-10 sm:mb-14">
          <h2
            className="font-display font-bold text-white leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            Where to Find Us
          </h2>
          <p
            className="font-body text-neutral-400 max-w-lg"
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
              lineHeight: 1.65,
            }}
          >
            Our workspace at DJ Sanghvi College of Engineering, Mumbai.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Address & Contact Info */}
          <div className="map-left-card opacity-0">
            <div
              ref={addressInfoRef}
              className="bg-white/[0.02] backdrop-blur-xl border rounded-2xl p-6 sm:p-8 flex flex-col transition-[border-color] duration-300"
              style={{ border: "1px solid rgba(255, 140, 0, 0.45)" }}
              onMouseEnter={() => onEnterCard(addressInfoRef.current)}
              onMouseLeave={() => onLeaveCard(addressInfoRef.current)}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <HiLocationMarker className="w-5 sm:w-6 h-5 sm:h-6 text-orange-400" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  DJ Sanghvi College of Engineering
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-ui font-bold text-white mb-2 text-sm sm:text-base">
                    Address
                  </h4>
                  <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed">
                    {address}
                  </p>
                </div>

                <div>
                  <h4 className="font-ui font-bold text-white mb-2 text-sm sm:text-base">
                    Contact Information
                  </h4>
                  <div className="flex items-center gap-3">
                    <HiMail className="w-4 sm:w-5 h-4 sm:h-5 text-orange-400" />
                    <span className="font-body text-sm sm:text-base text-gray-300">
                      djsphoenixteam@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="map-right-card opacity-0">
            <div
              ref={mapCardRef}
              className="bg-white/[0.02] backdrop-blur-xl border rounded-2xl overflow-hidden flex flex-col transition-[border-color] duration-300"
              style={{
                height: mapHeight,
                border: "1px solid rgba(255, 140, 0, 0.45)",
              }}
              onMouseEnter={() => onEnterCard(mapCardRef.current)}
              onMouseLeave={() => onLeaveCard(mapCardRef.current)}
            >
              <div className="w-full relative flex-1">
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
              <div className="p-3 sm:p-4 bg-black/80 backdrop-blur-sm relative z-20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div>
                    <h4 className="font-ui font-bold text-white text-xs sm:text-sm">
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
                    className="px-4 py-2 border-2 border-[#ff8c00] bg-[#ff8c00] text-black font-ui font-bold text-xs sm:text-sm rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300"
                  >
                    Open in Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
