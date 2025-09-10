import React from "react";
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

  return (
    <div className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask">
      <BeamsBackground intensity="medium" />
      <Navbar currentPage="Support" />

      <SupportHero data={supportHero} />
      <WaysToSupport items={waysToSupport} />
      <Wishlist groups={inKindWishlist} />
      <SponsorsStrip
        heading={currentSponsors.heading}
        note={currentSponsors.note}
        logos={sponsorLogos}
      />
      <HowToSponsor />
      <FAQ items={faq} />
      <ContactForm config={contactConfig} onSubmit={handleContactSubmit} />
    </div>
  );
};

export default Support;
