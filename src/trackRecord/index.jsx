import React, { useRef, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { color } from "three/tsl";

gsap.registerPlugin(ScrollTrigger);

const trackRecords = [
  {
    title: "Debt Advisory",
    description: "Raised $4Bn+ in Debt",
  },
  {
    title: "Equity Advisory",
    description: "Raised $2Bn+ in Equity",
  },
  {
    title: "Asset Management",
    description: "Managed $2Bn+ in Assets Under Management",
  },
  {
    title: "Trade Finance",
    description: "Structured trade finance deals exceeding $2Bn",
  },
];

const TrackRecord = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          delay: i * 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        py: 10,
        px: 4,
        display: "flex",
        justifyContent: "center",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {trackRecords.map((trackRecord, i) => (
        <Paper
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          elevation={4}
          sx={{
            width: 300,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            cursor: "default",
            userSelect: "none",
            position: "relative",
            overflow: "hidden",

            background: "rgba(20, 20, 20, 0.1)",
            backdropFilter: "blur(20px)",
            color: "#fff",

            border: "1px solid rgba(0, 255, 255, 0.15)",

            boxShadow: `
    0 0 0px rgba(0,255,255,0),
    0 0 20px rgba(0,255,255,0.05)
  `,

            transition: "all 0.4s ease",

            "&:hover": {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow: `
      0 0 5px rgba(0,255,255,0.15),
      0 0 10px rgba(0,255,255,0.08)
    `,
              border: "1px solid rgba(0, 255, 255, 0.35)",
            },

            // ✨ subtle animated glow layer
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.15), transparent 70%)",
              opacity: 0.4,
              animation: "cyanPulse 6s ease-in-out infinite",
              zIndex: 0,
            },

            "& > *": {
              position: "relative",
              zIndex: 1,
            },

            "@keyframes cyanPulse": {
              "0%, 100%": {
                opacity: 0.25,
                transform: "scale(1)",
              },
              "50%": {
                opacity: 0.4,
                transform: "scale(1.05)",
              },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: 700, color: "#fff" }}
          >
            {trackRecord.title}
          </Typography>
          <Typography variant="body2" color="white">
            {trackRecord.description}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TrackRecord;
