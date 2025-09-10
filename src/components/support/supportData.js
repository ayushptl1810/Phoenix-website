import brochurePdf from "../../assets/Brochure.pdf";

export const supportHero = {
  title: "Support DJS Phoenix",
  subtitle:
    "Fuel innovation in aerial robotics. Your support—monetary or in-kind—directly powers R&D, fabrication, and competition readiness.",
  primaryCta: { label: "Sponsor Us", href: "#contact" },
  secondaryCta: {
    label: "Download Brochure",
    href: brochurePdf,
    target: "_blank",
  },
};

export const waysToSupport = [
  {
    key: "monetary",
    title: "Monetary Support",
    description:
      "Accelerate builds and testing cycles. Funds are allocated across fabrication, testing, safety, travel, and contingencies.",
    highlights: [
      "Direct impact on current prototype milestones",
      "Transparent allocation and acknowledgments",
      "Simple invoicing and receipts",
    ],
  },
  {
    key: "inKind",
    title: "In‑Kind Support",
    description:
      "Provide materials, components, services, or facilities. See our dynamic wishlist and timing needs below.",
    highlights: [
      "Materials, components, fabrication and testing",
      "Software licenses and professional services",
      "Mentorship and training opportunities",
    ],
  },
];

// Removed useOfFunds and nextMilestones per updated requirements

export const inKindWishlist = [
  {
    category: "Mechanical",
    items: [
      "Advanced fabrication and machining support",
      "Access to precision testing and calibration rigs",
      "Structural design validation and optimization",
      "Manufacturing guidance and prototype reviews",
    ],
  },
  {
    category: "Electronics",
    items: [
      "Avionics collaboration and validation",
      "Power systems and safety resources",
      "Lab access for testing and tuning",
    ],
  },
  {
    category: "Coding",
    items: [
      "Software/tools access and licenses",
      "Mentorship on perception/control",
      "CI/testing infrastructure assistance",
    ],
  },
  {
    category: "Marketing",
    items: [
      "Brand and content collaboration",
      "Media partnerships and press coverage",
      "Event presence and promotional engagement",
      "Digital outreach and public relations support",
    ],
  },
];

// recognition policy intentionally omitted per requirements (no section needed)

export const currentSponsors = {
  heading: "Our Current Supporters",
  note: "Thank you for powering our mission. Displayed mid‑page to avoid duplication with the footer.",
  logos: [
    // Add logo imports in the page to avoid hardcoding paths here
  ],
};

export const mediaKit = [
  { label: "Logo Pack", href: "#media-kit" },
  { label: "Brand Guidelines", href: "#media-kit" },
  { label: "Team Photos", href: "#media-kit" },
  { label: "One‑Pager", href: "#media-kit" },
];

export const faq = [
  {
    q: "Do you offer sponsorship tiers?",
    a: "No. We follow a non‑tiered approach with equal recognition for all sponsors.",
  },
  {
    q: "Can support be in‑kind?",
    a: "Yes—materials, components, services, facilities, software, or mentorship.",
  },
  {
    q: "What documentation do you provide?",
    a: "Invoices/receipts, acknowledgment letters, and MoUs as applicable.",
  },
  {
    q: "How are logos used?",
    a: "We coordinate approvals before usage across web, print, vehicles, and apparel.",
  },
];

export const contactConfig = {
  heading: "Get in touch",
  subheading:
    "Submit a sponsorship interest—monetary or in‑kind—and we’ll reach out within 2 business days.",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "supportType",
      label: "Type of Support",
      type: "select",
      options: ["Monetary", "In‑Kind", "Both", "Other"],
      required: true,
    },
    { name: "organization", label: "Organization", type: "text" },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
      placeholder:
        "Send us a message if you would like to discuss a potential sponsorship or partnership.",
    },
  ],
  submitLabel: "Send Inquiry",
};
