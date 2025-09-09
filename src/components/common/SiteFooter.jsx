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
}) => {
  // Auto-load sponsor assets if not provided via props
  const resolvedSponsors = useMemo(() => {
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
      return Object.entries(logos)
        .slice(0, 4) // ensure only 4 are displayed if more exist
        .map(([path, url]) => ({
          name: toDisplayName(path),
          logo: url,
          rawPath: path,
        }));
    } catch (e) {
      return [];
    }
  }, [sponsors]);

  const defaultNav = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Fleet", href: "/fleet" },
      { label: "Team", href: "/team" },
      { label: "Achievements", href: "/achievements" },
    ],
    []
  );

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-300 border-t border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
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
              {(navLinks && navLinks.length > 0 ? navLinks : defaultNav).map(
                (link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Center/Right: Sponsors (logos only) */}
          {resolvedSponsors.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 md:gap-6 mx-auto">
              {resolvedSponsors.map((s, idx) => (
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
