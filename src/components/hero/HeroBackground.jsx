import React from "react";
import ScrollExpandMedia from "./ScrollExpandMedia";
import heroVideoUrl from "../../assets/hero.mp4";
import heroImageUrl from "../../assets/HeroImage.png";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={heroVideoUrl}
        posterSrc={heroImageUrl}
        bgImageSrc={heroImageUrl}
        textBlend
      />
    </div>
  );
}

export default HeroBackground;
