import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50 justify-center items-center flex flex-col gap-2 group"
    >
      <motion.button
        onClick={scrollToTop}
        whileHover={{
          backgroundColor: "rgb(0, 255, 255)",
          boxShadow: "0 15px 40px rgba(0, 255, 255, 0.3)",
          scale: 1.1,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
        style={{
          backgroundColor: "rgb(16,16,16)",
          border: "1px solid rgba(0, 255, 255, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 255, 255, 0.15)",
        }}
      >
        <KeyboardArrowUpIcon className="text-cyan-600" />
      </motion.button>
      <Typography
        variant="caption"
        className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-cyan-600"
      >
        SCROLL TO TOP
      </Typography>
    </motion.div>
  );
};

export default ScrollToTopButton;
