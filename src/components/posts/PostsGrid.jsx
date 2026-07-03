import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PostsCard from "./PostsCard";
import { postsData } from "./postsData";

gsap.registerPlugin(ScrollTrigger);

const PostsGrid = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".post-card-item");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 98%",
              end: "top 72%",
              scrub: 0.3,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...postsData].reverse().map((post, index) => (
          <PostsCard
            key={index}
            title={post.title}
            excerpt={post.excerpt}
            image={post.image}
            linkedinUrl={post.linkedinUrl}
            imageFit={post.imageFit}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
