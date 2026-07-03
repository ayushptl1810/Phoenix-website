import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

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

  const handleContactSubmit = async (data) => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      throw new Error(
        "Sponsorship form is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY in the environment."
      );
    }

    const payload = {
      access_key: accessKey,
      subject: `New Sponsorship Inquiry: ${data.supportType} from ${data.name}`,
      from_name: "DJS Phoenix Website",
      name: data.name,
      email: data.email,
      organization: data.organization || "None Provided",
      support_type: data.supportType,
      message: data.message,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to send message. Please try again.");
    }
  };

  // Force ScrollTrigger calculations to settle on mount
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask">
      <Navbar currentPage="Support" />

      <div>
        <SupportHero data={supportHero} />
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12">
        <WaysToSupport items={waysToSupport} />
      </div>
      <div>
        <Wishlist groups={inKindWishlist} />
      </div>
      <div>
        <SponsorsStrip
          heading={currentSponsors.heading}
          note={currentSponsors.note}
          logos={sponsorLogos}
        />
      </div>
      <div>
        <HowToSponsor />
      </div>
      <div>
        <FAQ items={faq} />
      </div>
      <div>
        <ContactForm config={contactConfig} onSubmit={handleContactSubmit} />
      </div>
    </div>
  );
};

export default Support;
