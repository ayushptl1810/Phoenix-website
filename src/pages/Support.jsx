import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import BeamsBackground from "../components/common/BeamsBackground";
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
import EthixLogo from "../assets/Sponsors/Ethixlogo.png";
import SolidWorksLogo from "../assets/Sponsors/SolidWorks_Logo.png";
import TechmentryLogo from "../assets/Sponsors/Techmentrylogo.png";
import ATCLogo from "../assets/Sponsors/atclogo.png";

const Support = () => {
  const sponsorLogos = [
    { src: ANSYSLogo, alt: "ANSYS" },
    { src: SolidWorksLogo, alt: "SolidWorks" },
    { src: EthixLogo, alt: "Ethix" },
    { src: TechmentryLogo, alt: "Techmentry" },
    { src: ATCLogo, alt: "ATC Group", scale: 2 },
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
      <BeamsBackground intensity="medium" />
      <Navbar currentPage="Support" />

      <motion.div variants={sectionVariants}>
        <SupportHero data={supportHero} />
      </motion.div>
      <motion.div variants={sectionVariants}>
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
