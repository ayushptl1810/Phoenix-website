import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "../../assets/Logo.png";

const Navbar = ({ currentPage = "Home" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/fleet", label: "Fleet" },
    { to: "/team", label: "Team" },
    { to: "/achievements", label: "Achievements" },
    { to: "/posts", label: "Posts" },
    { to: "/support", label: "Support Us" },
  ];

  // Header entrance animations
  useGSAP(() => {
    // 1. Slide header down
    gsap.fromTo(
      headerRef.current,
      { y: -100 },
      { y: 0, duration: 0.6, ease: "power4.out" }
    );

    // 2. Fade/slide logo
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );

    // 3. Fade/slide desktop nav
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    }

    // 4. Fade/slide mobile menu button
    if (menuButtonRef.current) {
      gsap.fromTo(
        menuButtonRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    }
  }, { scope: headerRef });

  // Mobile menu transitions
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.killTweensOf(".mobile-nav-link");

      // Animate dropdown open
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );

      // Stagger items
      gsap.fromTo(
        ".mobile-nav-link",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.05,
          delay: 0.05,
          ease: "power2.out",
        }
      );
    } else {
      gsap.killTweensOf(mobileMenuRef.current);
      // Animate dropdown close
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-300 border-b border-gray-600/60 backdrop-blur-md bg-black/80 shadow-lg shadow-black/20 transform-gpu"
    >
      <div className="container mx-auto px-4 sm:px-6 h-12 sm:h-16 flex items-center justify-between">
        {/* Left: Logo + Brand + Current Page */}
        <div ref={logoRef} className="flex items-center space-x-2 sm:space-x-4 opacity-0">
          <Link
            to="/"
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={Logo}
              alt="DJS Phoenix Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain hover:scale-105 active:scale-95 transition-transform duration-200 ease-out"
            />
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-display text-sm sm:text-lg font-bold text-white tracking-tight">
                DJS PHOENIX
              </span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="font-ui text-xs sm:text-sm text-orange-400 font-semibold tracking-wider hidden sm:inline">
                {currentPage}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav
          ref={navRef}
          className="hidden lg:flex items-center space-x-3 md:space-x-4 opacity-0"
        >
          {navLinks.map((link) => (
            <div
              key={link.to}
              className="hover:scale-105 active:scale-95 transition-transform duration-200 ease-out"
            >
              <Link
                to={link.to}
                className="px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors ui-text"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 opacity-0"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden absolute top-full right-4 mt-2 z-50 bg-black/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="py-2 px-3 min-w-[120px]">
          {navLinks.map((link) => (
            <div key={link.to} className="mobile-nav-link opacity-0">
              <Link
                to={link.to}
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors ui-text"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
