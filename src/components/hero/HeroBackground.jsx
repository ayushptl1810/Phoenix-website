import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import heroVideoUrl from "../../assets/hero.mp4";

function HeroBackground() {
  const videoRef = useRef(null);
  const reversingRef = useRef(false);
  const cleanupSeekListenerRef = useRef(() => {});

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted autoplay works across browsers
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1;
    video.preload = "auto";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If reduced motion is requested, just show first frame
    if (prefersReducedMotion) {
      const onLoaded = () => {
        try {
          video.pause();
        } catch (e) {}
      };
      video.addEventListener("loadeddata", onLoaded);
      return () => {
        video.removeEventListener("loadeddata", onLoaded);
      };
    }

    // Reverse playback by stepping via seeked events (more reliable across browsers)
    const reverseFps = 30; // target reverse frames per second
    const reverseStepSeconds = 1 / reverseFps;

    const scheduleReverseStep = () => {
      if (!reversingRef.current) return;
      const nextTime = Math.max(0, video.currentTime - reverseStepSeconds);
      if (nextTime <= 0.001) {
        // reached start: play forward again
        reversingRef.current = false;
        try {
          video.currentTime = 0;
          video.playbackRate = 1;
          video.play();
        } catch (e) {}
        return;
      }
      try {
        // Wait for 'seeked' before next step
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          scheduleReverseStep();
        };
        video.addEventListener("seeked", onSeeked);
        cleanupSeekListenerRef.current = () =>
          video.removeEventListener("seeked", onSeeked);
        video.currentTime = nextTime;
      } catch (e) {
        // If seeking fails, try again on next frame
        setTimeout(scheduleReverseStep, 33);
      }
    };

    const onEnded = () => {
      // Start manual reverse when the forward playback ends
      reversingRef.current = true;
      try {
        video.pause();
      } catch (e) {}
      scheduleReverseStep();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        try {
          video.pause();
        } catch (e) {}
      } else if (!reversingRef.current) {
        try {
          video.play();
        } catch (e) {}
      }
    };

    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Kick off autoplay if possible
    const tryPlay = async () => {
      try {
        await video.play();
      } catch (e) {
        // Autoplay might fail until user interaction; ignore
      }
    };
    tryPlay();

    return () => {
      try {
        cleanupSeekListenerRef.current();
      } catch (e) {}
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const videoVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  const patternVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 1,
      },
    },
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Background */}
      <motion.video
        ref={videoRef}
        src={heroVideoUrl}
        playsInline
        muted
        preload="metadata"
        autoPlay
        className="absolute inset-0 w-full h-full object-cover object-center"
        controls={false}
        controlsList="nodownload nofullscreen noplaybackrate"
        disablePictureInPicture
        variants={videoVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Enhanced overlay for better text readability */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)",
        }}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Animated geometric patterns */}
      <motion.div
        className="absolute inset-0"
        variants={patternVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/10 transform rotate-45 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-white/10 rounded-full animate-pulse delay-1500"></div>
      </motion.div>
    </div>
  );
}

export default HeroBackground;
