import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Scroll to top immediately when route changes
    window.scrollTo(0, 0);
    
    // Animate entrance (fade-in only to support fixed positioning contexts)
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="opacity-0">
      {children}
    </div>
  );
};

export default PageWrapper;
