import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/common/Navbar";
import PostsGrid from "../components/posts/PostsGrid";

gsap.registerPlugin(ScrollTrigger);

const Posts = () => {
  const containerRef = useRef(null);

  // Force ScrollTrigger refresh on mount to resolve early trigger calculations
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".posts-title",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      );
      tl.fromTo(
        ".posts-desc",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
      tl.fromTo(
        ".posts-grid-wrapper",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white bg-grid-mask bg-noise-mask"
    >
      <Navbar currentPage="Posts" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="posts-title opacity-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent leading-[1.3]">
              Phoenix Posts
            </h1>
            <p className="posts-desc opacity-0 font-body text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Stay updated with the latest news, insights, and stories from the
              Phoenix team
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="posts-grid-wrapper opacity-0 container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <PostsGrid />
      </main>
    </div>
  );
};

export default Posts;
