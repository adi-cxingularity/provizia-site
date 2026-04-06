import React, { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { color } from "three/tsl";

const ModernCard = ({ card }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [flash, setFlash] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  // 🎯 Tilt
  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  // 🎯 Light direction synced with tilt
  const lightAngle = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `${ry * 3}deg`,
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;

    x.set(posX);
    y.set(posY);
  };

  const triggerFlash = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin({ x: percentX, y: percentY });

    setFlash(true);
    setTimeout(() => setFlash(false), 450);
  };

  return (
    <Box sx={{ perspective: 1000 }}>
      <Card
        component={motion.div}
        onMouseMove={handleMouseMove}
        onMouseEnter={triggerFlash}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        scale={0.85}
        whileHover={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        sx={{
          height: 350,
          width: 300,
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",

          // ✨ GLASSMORPHISM
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(0, 255, 255, 0.15)",

          boxShadow: ` 0 0 5px rgba(0,255,255,0.25), 0 0 10px rgba(0,255,255,0.05)`,

          "&:hover": {
            boxShadow: "0 20px 60px rgba(0,0,0,0.9)",
          },
        }}
      >
        {/* IMAGE */}
        {/* IMAGE CONTAINER (elevated layer) */}
        <Box
          component={motion.div}
          style={{
            transform: "translateZ(40px)", // 👈 gives real 3D lift
          }}
          sx={{
            height: 260,
            width: "92%",
            mx: "auto",
            mt: 2,
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            // 🎯 slightly different shade (depth)
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            backdropFilter: "blur(6px)",

            // 🎯 OUTER SHADOW (lift)
            boxShadow: `
      0 10px 25px rgba(0,0,0,0.8),
      0 2px 6px rgba(255,255,255,0.05) inset
    `,

            // ✨ subtle top highlight (glass edge)
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.15), transparent 40%)",
              pointerEvents: "none",
            },
          }}
        >
          {/* IMAGE */}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundImage: `url(${card.url})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              scale: 0.98,
              backgroundColor: "white",
              borderRadius: "12px",
              filter: "grayscale(100%)",
              transition: "filter 0.5s ease, transform 0.4s ease",

              // 👇 slight zoom on hover = more depth
              ".MuiCard-root:hover &": {
                filter: "grayscale(0%)",
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>

        {/* ✨ SUBTLE LIGHT SHEEN (always present but VERY faint) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(${lightAngle}, transparent, rgba(255,215,0,0.08), transparent)`,
            mixBlendMode: "color-dodge",
            pointerEvents: "none",
          }}
        />

        {/* 🔥 CURSOR-BASED GOLD BURST */}
        <AnimatePresence>
          {flash && (
            <>
              {/* Radial pixel burst */}
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: `${origin.x}%`,
                  top: `${origin.y}%`,
                  width: 200,
                  height: 200,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",

                  backgroundImage: `
                    radial-gradient(circle, #00ffff 10%, transparent 60%),
                    repeating-linear-gradient(
                      135deg,
                      #00ffff 0 4%,
                      #00cccc 4% 8%,
                      #009999 8% 12%
                    )
                  `,
                  backgroundSize: "auto, 8px 8px",

                  mixBlendMode: "color-dodge",
                  filter: "blur(1px) brightness(1.6)",
                  pointerEvents: "none",
                  zIndex: 6,
                }}
              />

              {/* ✨ SHARD HIGHLIGHT (angle synced) */}
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(${lightAngle}, transparent, rgba(0,255,255,0.8), transparent)`,
                  mixBlendMode: "color-dodge",
                  filter: "blur(10px)",
                  pointerEvents: "none",
                  zIndex: 7,
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* 🧠 NOISE TEXTURE (pixel grit) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/noise.png')",
            pointerEvents: "none",
          }}
        />

        {/* TEXT */}
        <Typography
          className="font-family: 'Poppins', sans-serif;"
          sx={{
            mt: 2,
            px: 2,
            fontSize: "1.2rem",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "white",
            textAlign: "center",
          }}
        >
          {card.title}
        </Typography>

        <Typography sx={{ px: 2, mt: 1, fontSize: "1rem", opacity: 0.8 }}>
          {card.desc}
        </Typography>
      </Card>
    </Box>
  );
};

export default ModernCard;
