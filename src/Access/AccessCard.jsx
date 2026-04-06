import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const AccessCard = ({ role }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="min-w-[500px] max-w-[800px] h-[450px] flex rounded-2xl p-5 gap-4"
      style={{
        backgroundColor: "rgb(16,16,16)",
        border: "1px solid rgba(0, 255, 255, 0.15)",
        boxShadow: "0 10px 30px rgba(0, 255, 255, 0.08)",
      }}
    >
      {/* LEFT */}
      <div className="flex flex-col justify-center gap-4 text-white w-[85%]">
        <div>
          <Typography
            variant="h6"
            className="mb-2 font-semibold tracking-tight"
          >
            {role.title}
          </Typography>

          <Typography className="text-white/60 text-sm leading-snug">
            {role.desc}
          </Typography>
        </div>

        <Button
          variant="contained"
          href={role.loginUrl}
          target="_blank"
          className="w-fit bg-cyan-400 text-black hover:bg-cyan-300 text-xs px-4 py-1"
        >
          Login
        </Button>
      </div>

      {/* RIGHT (IMAGE) */}
      <motion.div
        whileHover={{ rotateY: 8 }}
        className="w-350 h-full rounded-xl overflow-hidden"
        style={{
          border: "1px solid rgba(0, 255, 255, 0.15)",
          boxShadow: "0 10px 30px rgba(0, 255, 255, 0.12)",
        }}
      >
        <img
          src={role.image}
          alt={role.title}
          className="w-[98%] h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default AccessCard;
