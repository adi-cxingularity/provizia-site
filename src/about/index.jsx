// About.jsx
import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { color } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    // Slide up text on scroll
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      },
    );

    // Slow horizontal movement of background shape
    gsap.to(shapeRef.current, {
      x: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        height: "70vh",
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        ref={shapeRef}
        sx={{
          position: "absolute",
          top: "20%",
          left: "-15%",
          width: 150,
          height: 150,
          backgroundColor: "#0072ce",
          borderRadius: "50%",
          opacity: 0.15,
          filter: "blur(25px)",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      <Box
        ref={textRef}
        sx={{
          maxWidth: 600,
          zIndex: 10,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          About Our Financial Advisory
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", opacity: 0.6 }}>
          Provizia Capital is a boutique corporate advisory firm, offering
          bespoke solutions for our client’s capital needs, using conventional
          debt, equity or alternative structures.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
