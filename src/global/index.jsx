import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Scene3D from "./Scene3D";
import globe from "../assets/images/earth.png";

const GlobeHero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* =========================
     SCROLL ANIMATION (SMOOTH)
  ========================= */

  // 🔥 Reduced tilt (fixes cylinder distortion)
  const rotateX = useTransform(scrollYProgress, [0.1, 1], [0, 12]);
  const rotateY = useTransform(scrollYProgress, [0.1, 1], [0, -12]);

  const rawRotateZ = useTransform(scrollYProgress, [0.1, 1], [-10, 20]);
  const rotateZ = useSpring(rawRotateZ, {
    stiffness: 40,
    damping: 80,
  });

  // 🔥 smoother scale curve
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1.4, 1.7, 1.2]);

  const y = useTransform(scrollYProgress, [0, 0.6, 1], [-90, 90, 90]);
  const x = useTransform(scrollYProgress, [0, 0.2, 0.6], ["0%", "10%", "-50%"]);

  const blur = useTransform(scrollYProgress, [0, 1], [0, 0.1]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  /* 🖱️ Mouse light */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const lightX = useTransform(mouseX, [-0.5, 0.5], [-120, 120]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], [-120, 120]);

  // HEADER
  const hOpacity = useTransform(scrollYProgress, [0.25, 0.52, 1], [0, 1, 1]);
  const hX = useTransform(
    scrollYProgress,
    [0.25, 0.52, 1],
    ["120%", "0%", "0%"],
  );

  // FIRST PARAGRAPH
  const p1Opacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const p1X = useTransform(
    scrollYProgress,
    [0.5, 0.6, 1],
    ["120%", "0%", "0%"],
  );

  // SECOND PARAGRAPH
  const p2Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);
  const p2X = useTransform(
    scrollYProgress,
    [0.6, 0.7, 1],
    ["120%", "0%", "0%"],
  );

  const smoothHX = useSpring(hX, { stiffness: 120, damping: 25 });
  const smoothP1X = useSpring(p1X, { stiffness: 120, damping: 25 });
  const smoothP2X = useSpring(p2X, { stiffness: 120, damping: 25 });

  const hY = useTransform(scrollYProgress, [0.45, 0.6, 1], [0, 50, 80]);
  const p1Y = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 60, 80]);
  const p2Y = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 80, 80]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* 🎬 STICKY SCENE */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 🌌 GLOBAL 3D BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <Scene3D scrollYProgress={scrollYProgress} />
        </div>

        {/* 🌍 GLOBE */}
        <div className="absolute inset-0 z-10 flex items-center justify-center perspective-[1500px]">
          <motion.img
            src={globe}
            alt="globe"
            style={{
              rotateX,
              rotateY,
              rotateZ,
              scale,
              y,
              x,
              filter: blurFilter,
              opacity: 0.6,
            }}
            className="relative z-10 w-[500px]"
          />
        </div>

        {/* 💡 MOUSE LIGHT */}
        <motion.div
          style={{ x: lightX, y: lightY }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[140px] h-[140px] bg-cyan-400/70 blur-[120px] rounded-full pointer-events-none"
        />

        {/* 🌫 ATMOSPHERE */}
        <div className="absolute inset-0 z-30  pointer-events-none" />

        {/* 🖤 VIGNETTE */}
        <div className="absolute inset-0 z-40 pointer-events-none" />
        {/* 📝 TEXT LAYER (INSIDE STICKY) */}
        <div className="absolute inset-0 z-50 flex items-center justify-end pr-20 pointer-events-none">
          <div className="max-w-md text-white space-y-4">
            <motion.h2
              style={{
                opacity: hOpacity,
                x: smoothHX,
                y: hY,
              }}
              className="text-4xl font-semibold"
            >
              Global Presence
            </motion.h2>

            <motion.p
              style={{
                fontWeight: 600,
                opacity: p1Opacity,
                x: smoothP1X,
                y: p1Y,
                opacity: 0.8,
              }}
              className="text-lg text-gray-300"
            >
              Operating from key financial hubs—Dubai, Singapore, and London—we
              serve clients across the Middle East, Southeast Asia, the Indian
              subcontinent, the UK, and the Americas.
            </motion.p>

            <motion.p
              style={{
                fontWeight: 600,
                opacity: p2Opacity,
                x: smoothP2X,
                y: p2Y,
                opacity: 0.8,
              }}
              className="text-gray-300"
            >
              We further extend our reach through a strong network of channel
              partners and service providers, enabling broader market coverage
              and enhanced client solutions.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeHero;
