import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import SupportHero from "../components/support/SupportHero";
import WaysToSupport from "../components/support/WaysToSupport";
import Wishlist from "../components/support/Wishlist";
import SponsorsStrip from "../components/support/SponsorsStrip";
import HowToSponsor from "../components/support/HowToSponsor";
import FAQ from "../components/support/FAQ";
import ContactForm from "../components/support/ContactForm";
import {
  supportHero,
  waysToSupport,
  inKindWishlist,
  currentSponsors,
  mediaKit,
  faq,
  contactConfig,
} from "../components/support/supportData";

import ANSYSLogo from "../assets/Sponsors/ANSYS_logo.png";
import SolidWorksLogo from "../assets/Sponsors/SolidWorks_Logo.png";
import NinetronLogo from "../assets/Sponsors/Ninetron_logo.png";
import CUAVLogo from "../assets/Sponsors/CUAV_logo.png";
import ATCLogo from "../assets/Sponsors/atclogo.png";
import AltiumLogo from "../assets/Sponsors/altium-designer-software.png";
import FalconSkyworksLogo from "../assets/Sponsors/Falcon_Skyworks.png";

const Support = () => {
  const sponsorLogos = [
    { src: ANSYSLogo, alt: "ANSYS", brightness: 5 },
    { src: SolidWorksLogo, alt: "SolidWorks", brightness: 5 },
    { src: NinetronLogo, alt: "Ninetron", brightness: 5 },
    { src: CUAVLogo, alt: "CUAV", brightness: 5 },
    { src: ATCLogo, alt: "ATC Group", brightness: 5, scale: 2.5 },
    { src: AltiumLogo, alt: "Altium Designer", brightness: 5, scale: 2 },
    {
      src: FalconSkyworksLogo,
      alt: "Falcon Skyworks",
      brightness: 5,
      scale: 1.5,
    },
  ];

  const handleContactSubmit = (data) => {
    // Generic submit handler (integrate with backend or email service as needed)
    // For now, log and provide a client-side acknowledgment.
    // eslint-disable-next-line no-console
    console.log("Support inquiry submitted", data);
    alert("Thanks! We will get back to you shortly.");
  };

  // Standardized animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
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
    <motion.div
      className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar currentPage="Support" />

      <motion.div variants={sectionVariants}>
        <SupportHero data={supportHero} />
      </motion.div>
      <motion.div
        variants={pageVariants}
        className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12"
      >
        <WaysToSupport items={waysToSupport} />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Wishlist groups={inKindWishlist} />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <SponsorsStrip
          heading={currentSponsors.heading}
          note={currentSponsors.note}
          logos={sponsorLogos}
        />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <HowToSponsor />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <FAQ items={faq} />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <ContactForm config={contactConfig} onSubmit={handleContactSubmit} />
      </motion.div>
    </motion.div>
  );
};

export default Support;
