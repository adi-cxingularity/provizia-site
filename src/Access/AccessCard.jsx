import React from "react";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { color } from "three/tsl";

const AccessCard = ({ role, index, registerRef, onHover }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /* ─── Mobile layout: simple stacked card ─── */
  if (isMobile) {
    return (
      <div
        ref={registerRef}
        style={{
          backgroundColor: "rgb(16,16,16)",
          border: "1px solid rgba(0, 255, 255, 0.2)",
          boxShadow: "0 15px 40px rgba(0, 255, 255, 0.15)",
          borderRadius: "1rem",
          overflow: "hidden",
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          flexShrink: 0,
        }}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",
            height: 180,
            backgroundColor: "rgb(20,20,20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={role.image}
            alt={role.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "1rem",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <Typography
            variant="h6"
            style={{
              color: "white",
              fontWeight: 600,
              marginBottom: "0.5rem",
              fontSize: "1rem",
            }}
          >
            {role.title}
          </Typography>
          <Typography
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem",
              lineHeight: 1.5,
              marginBottom: "1rem",
            }}
          >
            {role.desc}
          </Typography>
          <Button
            variant="contained"
            href={role.loginUrl}
            target="_blank"
            sx={{
              mt: 2,
              px: 2,
              py: 1,
              backgroundColor: "rgba(0, 255, 255, 0.65)",
              boxShadow: "0 8px 20px rgba(0, 255, 255, 0.4)",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 255, 255, 0.8)",
                boxShadow: "0 12px 30px rgba(0, 255, 255, 0.5)",
              },
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  /* ─── Desktop layout: original hover/animation layout ─── */
  return (
    <motion.div
      ref={registerRef}
      onHoverStart={() => onHover(index)}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { flex: "0 0 90%", maxWidth: "600px", scale: 0.9, opacity: 0.7 },
        hover: {
          flex: "0 0 100%",
          maxWidth: "700px",
          scale: 1,
          opacity: 1,
          justifyContent: "center",
        },
      }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative w-full h-[420px] cursor-pointer"
    >
      {/* IMAGE CARD */}
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
        transition={{ type: "spring", stiffness: 120 }}
        className="absolute right-0 top-0 z-10 w-[80%] h-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgb(16,16,16)",
          border: "1px solid rgba(0, 255, 255, 0.15)",
          boxShadow: "0 25px 60px rgba(0, 255, 255, 0.25)",
        }}
      >
        <motion.div
          variants={{ rest: { rotateY: 0 }, hover: { rotateY: 6 } }}
          className="w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={role.image}
            alt={role.title}
            className="w-full h-full object-contain p-6"
          />
        </motion.div>
      </motion.div>

      {/* TEXT CARD */}
      <motion.div
        initial={{ x: "-20%", scale: 0.95, opacity: 0.85, zIndex: 0 }}
        whileHover={{
          x: "0%",
          scale: 1,
          opacity: 1,
          rotateY: 2,
          zIndex: 20,
          border: "rgba(0, 255, 255, 0.5)",
          boxShadow: "0px 0.5px 20px rgba(0, 255, 255, 0.5)",
          transition: { type: "spring", stiffness: 100, damping: 18 },
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] py-16 px-8 rounded-2xl"
        style={{
          backgroundColor: "rgba(16,16,16,0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 255, 255, 0.25)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <Typography
          variant="h6"
          className="mb-2 font-semibold tracking-tight text-white"
        >
          {role.title}
        </Typography>

        <Typography className="text-white/60 text-sm leading-snug mb-4">
          {role.desc}
        </Typography>

        <Button
          variant="contained"
          href={role.loginUrl}
          target="_blank"
          sx={{
            mt: 2,
            px: 2,
            py: 1,
            backgroundColor: "rgba(0, 255, 255, 0.65)",
            boxShadow: "0 8px 20px rgba(0, 255, 255, 0.4)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 255, 255, 0.75)",
              boxShadow: "0 12px 30px rgba(0, 255, 255, 0.5)",
            },
          }}
        >
          Login
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AccessCard;
