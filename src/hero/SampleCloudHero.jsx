import React, { useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//assets
import Sky from "../assets/images/sky-clouds.jpg";
import Bridge from "../assets/images/Bridge.png";
import Cloud1 from "../assets/images/cloud1.jpg";
import SingleCloud1 from "../assets/images/singlecloud1.png";
import SingleCloud2 from "../assets/images/singleCLoud2.png";
import { rotate } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const textRef = useRef();

  useEffect(() => {
    // Text entrance
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
    );

    // Parallax layers
    gsap.to(".bg", {
      y: -40,
      scale: 1.1,
      transformOrigin: "center center",
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        scrub: true,
      },
    });

    gsap.to(".mid", {
      y: -80, // move up (camera moving forward)
      scale: 1.25, // zoom in
      transformOrigin: "center bottom", // anchor to ground
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".front", {
      y: -300,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text parallax
    gsap.to(textRef.current, {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <Box
      sx={{
        background: "rgb(16, 16, 16)",
        p: 3,
      }}
    >
      <Box
        id="hero"
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #fdfdfd 0%, #f3f3f3 100%)",
          perspective: "1000px",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Background */}
        <Box
          component="img"
          src={Sky}
          className="bg"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <Box
          component="img"
          src={Cloud1}
          className="mid"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Front cloud 1 */}
        {/* <Box
        component="img"
        src={SingleCloud1}
        className="front"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          userSelect: "none",
          width: "50%",
          height: "50%",
          opacity: 0.8,
        }}
      /> */}

        {/* Front cloud 2 (extra depth) */}
        {/* <Box
        component="img"
        src={SingleCloud2}
        className="front"
        sx={{
          position: "absolute",
          bottom: "-5%",
          left: -"50%",
          width: "100%",
          opacity: 0.85,
          pointerEvents: "none",
          userSelect: "none",
          width: "50%",
          height: "50%",
          opacity: 0.8,
          backgroundFill: "white",
        }}
      /> */}

        {/* Content */}
        <Box
          ref={textRef}
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#0d1b2a",
            px: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "2.5rem", md: "4rem", lg: "7rem" },
            }}
          >
            Provizia
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              maxWidth: 600,
              opacity: 0.8,
            }}
          >
            A modern talent experience powered by immersive interactions.
          </Typography>

          <Button variant="contained" sx={{ mt: 4, borderRadius: "999px" }}>
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
