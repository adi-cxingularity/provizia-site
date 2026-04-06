import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ModernCard from "../assets/ui-components/ModernCard";
import { cards } from "./cards";

const Clients = () => {
  return (
    <Box>
      {/* Top scroll hint */}
      <Box
        sx={{
          height: "14rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: { xs: 3, md: 6 },
          maxWidth: "900px",
          mt: 2,
          mb: -20,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            50+ Years of Experience
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <Typography
            variant="h5"
            sx={{
              opacity: 0.6,
              mt: 2,
              lineHeight: 1.6,
              maxWidth: "700px",
              letterSpacing: "-0.02em",
            }}
          >
            Prior to setting up Provizia Capital, our founding partners gained
            extensive industry experience across multiple market cycles and
            investment strategies.
          </Typography>
        </motion.div>
      </Box>

      {/* Horizontal scroll carousel */}
      <HorizontalScrollCarousel />
    </Box>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["5%", "-95%"]);
  const x = useSpring(xRaw, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  return (
    <Box
      ref={targetRef}
      component="section"
      sx={{
        position: "relative",
        height: "300vh",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          display: "flex",
          height: "100vh",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <motion.div style={{ x }} className="flex">
          <Box sx={{ display: "flex", gap: 2 }}>
            {cards.map((card, i) => (
              <ModernCard key={i} card={card} />
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Clients;
