import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Box, Button } from "@mui/material";
import bg from "../assets/images/beautiful-shot-urban-city-sunset.jpg";

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.7,
  });

  // 🎬 Controlled easing (prevents spill)
  const eased = useTransform(smooth, [0, 0.3, 0.6, 1], [0, 0.15, 0.7, 1]);

  // 🧠 Mask scale
  const scale = useTransform(eased, [0, 1], [1, 10]);

  // 🎭 Mask fade OUT
  const maskOpacity = useTransform(eased, [0, 0.75], [1, 0]);

  const textY = useTransform(eased, [0, 0.3, 0.45], ["25%", "50%", "70%"]);

  // 🌅 Full image reveal
  const revealOpacity = useTransform(eased, [0.7, 1], [0, 1]);
  const revealY = useTransform(eased, [0.7, 1], ["0%", "15%"]);

  // 📄 About section animations
  const aboutOpacity = useTransform(eased, [0.8, 0.9, 1], [0, 1, 1]);
  const aboutY = useTransform(eased, [0.8, 0.9, 1], [80, 380, 480]);
  const shapeX = useTransform(eased, [0.75, 1], [0, 100]);

  // 🌑 Subtle dim for readability
  const dimOverlay = useTransform(eased, [0.75, 1], [0, 0.4]);

  return (
    <section ref={ref} className="h-[200vh] relative overflow-hidden">
      <div className="sticky top-0 h-[200vh] flex items-center justify-center p-4">
        {/* 🪟 WINDOW CONTAINER */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            borderRadius: "28px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            boxShadow: `
              0 30px 80px rgba(0,0,0),
              // inset 0 0 0 1px rgba(255,255,255,0.05)
            `,
          }}
        >
          {/* 🎭 MASKED IMAGE */}
          <motion.div
            style={{ opacity: maskOpacity }}
            className="absolute inset-0 z-10"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <mask id="textMask">
                  <rect width="100%" height="100%" fill="black" />
                  <motion.text
                    x="50%"
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    stroke="#00ffff"
                    strokeWidth="3"
                    paintOrder="stroke"
                    fontSize="220"
                    fontWeight="1000"
                    style={{
                      scale,
                      transformOrigin: "center",
                      opacity: 0.6,
                      lineHeight: 0,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <tspan x="50%" dy="-0.5em">
                      PROVIZIA
                    </tspan>
                    <tspan x="50%" dy="0.8em">
                      CAPITAL
                    </tspan>
                  </motion.text>
                </mask>
              </defs>

              <g mask="url(#textMask)">
                <image
                  href={bg}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect width="100%" height="100%" fill="cyan" opacity="0.1" />
              </g>
            </svg>
          </motion.div>

          {/* 🌅 FULL IMAGE */}
          <motion.div
            style={{
              opacity: revealOpacity,
              y: revealY,
            }}
            className="absolute inset-0 z-0"
          >
            <img
              src={bg}
              className="w-full h-full object-cover scale-110"
              alt=""
            />
          </motion.div>

          {/* 🌑 DIM OVERLAY */}
          <motion.div
            style={{ opacity: dimOverlay }}
            className="absolute inset-0 bg-black z-20"
          />

          {/* 🎞️ GRAIN */}
          <div
            className="pointer-events-none absolute inset-0 z-40 opacity-35 mix-blend-overlay"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          />

          {/* 📄 ABOUT SECTION */}
          <motion.div
            style={{
              opacity: aboutOpacity,
              y: aboutY,
            }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="relative text-center max-w-2xl px-6 text-white">
              {/* Floating shape */}
              <motion.div
                style={{ x: shapeX, background: "rgba(0, 255, 255, 0.15)" }}
                className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-90 h-90 rounded-full  blur-3xl"
              />

              <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6 opacity-85">
                Financial Advisory <br /> Built for Growth
              </h2>

              <p className="text-lg opacity-70 leading-relaxed">
                Provizia Capital is a boutique corporate advisory firm, offering
                bespoke solutions for capital needs using debt, equity, and
                alternative structures.
              </p>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "rgba(0, 255, 255, 0.7)",
                  boxShadow: "0 8px 20px rgba(0, 255, 255, 0.4)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 255, 255, 0.8)",
                    boxShadow: "0 12px 30px rgba(0, 255, 255, 0.5)",
                  },
                }}
                href="#access"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </Box>
      </div>
    </section>
  );
};

export default Hero;
