import React, { useMemo } from "react";
import TeamLogo from "../../assets/Logo.png";

// Utility: convert file name to display name (e.g., "SolidWorks_Logo.png" -> "SolidWorks Logo")
function toDisplayName(filePath) {
  const justName = filePath.split("/").pop() || "";
  const noExt = justName.replace(/\.[a-zA-Z0-9]+$/, "");
  return noExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const SiteFooter = ({
  sponsors,
  navLinks = [],
  socials = [],
  forceMonochrome = true,
  maxNav = 8,
  // Sponsors are hidden by default; set showSponsors to true to render
  showSponsors = false,
  maxSponsors = 0, // used in grid mode
  sponsorDisplay = "marquee", // "marquee" | "grid"
  marqueeMax = 16,
  marqueeSpeed = 30, // seconds per loop
}) => {
  // Load sponsor assets only when explicitly enabled
  const loadedSponsors = useMemo(() => {
    if (!showSponsors) return [];
    if (Array.isArray(sponsors) && sponsors.length > 0) return sponsors;
    try {
      const logos = import.meta.glob(
        "../../assets/Sponsors/*.{png,svg,jpg,jpeg,webp}",
        {
          eager: true,
          query: "?url",
          import: "default",
        }
      );
      return Object.entries(logos).map(([path, url]) => ({
        name: toDisplayName(path),
        logo: url,
        rawPath: path,
      }));
    } catch (e) {
      return [];
    }
  }, [showSponsors, sponsors]);

  const displaySponsors = useMemo(() => {
    if (!showSponsors) return [];
    if (sponsorDisplay === "grid") {
      const limit = Math.max(0, maxSponsors || 0);
      return limit > 0 ? loadedSponsors.slice(0, limit) : [];
    }
    // marquee mode shows up to marqueeMax
    const limit = Math.max(0, marqueeMax || 0);
    return loadedSponsors.slice(0, limit);
  }, [showSponsors, loadedSponsors, sponsorDisplay, maxSponsors, marqueeMax]);

  const defaultNav = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Fleet", href: "/fleet" },
      { label: "Team", href: "/team" },
      { label: "Achievements", href: "/achievements" },
      { label: "Support Us", href: "/support" },
    ],
    []
  );

  const year = new Date().getFullYear();
  const linksToRender = (
    navLinks && navLinks.length > 0 ? navLinks : defaultNav
  ).slice(0, maxNav);

  // Determine marquee usage based on count; avoid loop for small numbers
  const sponsorCount = displaySponsors.length;
  const MARQUEE_THRESHOLD = 8; // require at least 8 to loop smoothly
  const useMarquee =
    showSponsors &&
    sponsorDisplay === "marquee" &&
    sponsorCount >= MARQUEE_THRESHOLD;

  // Duplicate sponsors for seamless marquee loop (only when enabled)
  const marqueeLogos = useMarquee
    ? [...displaySponsors, ...displaySponsors]
    : [];

  return (
    <footer className="relative z-300 border-t border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      {/* Sponsor showcase band */}
      {showSponsors &&
        sponsorDisplay === "marquee" &&
        sponsorCount > 0 &&
        (useMarquee ? (
          <div className="marquee border-b border-white/10">
            <div
              className="marquee__track py-3"
              style={{ animationDuration: `${marqueeSpeed}s` }}
            >
              {marqueeLogos.map((s, idx) => (
                <div
                  key={`${s.name}-${idx}`}
                  className="px-6 flex items-center opacity-95 hover:opacity-100 transition-opacity"
                  title={s.name}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-7 w-[120px] object-contain"
                    loading="lazy"
                    style={{
                      filter:
                        forceMonochrome &&
                        !s.preserveColor &&
                        !/color/i.test(s.rawPath || s.name)
                          ? "invert(1) grayscale(1) brightness(1.6)"
                          : undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-b border-white/10">
            <div className="container mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-6">
              {displaySponsors.map((s, idx) => (
                <div
                  key={`${s.name}-${idx}`}
                  className="flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity"
                  title={s.name}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-7 w-[120px] object-contain"
                    loading="lazy"
                    style={{
                      filter:
                        forceMonochrome &&
                        !s.preserveColor &&
                        !/color/i.test(s.rawPath || s.name)
                          ? "invert(1) grayscale(1) brightness(1.6)"
                          : undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 text-sm text-gray-300">
          {/* Left: Team logo + nav links */}
          <div className="flex items-center gap-4 min-w-0">
            <a href="/" className="inline-flex items-center">
              <img
                src={TeamLogo}
                alt="DJS Phoenix"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </a>
            <nav className="flex items-center gap-4 ui-text">
              {linksToRender.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Grid fallback (optional explicit grid mode) */}
          {showSponsors && sponsorDisplay === "grid" && sponsorCount > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 md:gap-6 mx-auto">
              {displaySponsors.map((s, idx) => (
                <div
                  key={`${s.name}-${idx}`}
                  className="flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity"
                  title={s.name}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="h-6 w-[120px] object-contain"
                    loading="lazy"
                    style={{
                      filter:
                        forceMonochrome &&
                        !s.preserveColor &&
                        !/color/i.test(s.rawPath || s.name)
                          ? "invert(1) grayscale(1) brightness(1.6)"
                          : undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Meta (right) */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-gray-400">© {year} DJS PHOENIX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
