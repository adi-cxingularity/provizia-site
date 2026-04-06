import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
      className="fixed bottom-8 right-8 z-50"
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: "rgb(16,16,16)",
          border: "1px solid rgba(0, 255, 255, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 255, 255, 0.15)",
        }}
      >
        <KeyboardArrowUpIcon className="text-cyan-400" />
      </button>
    </motion.div>
  );
};

export default ScrollToTopButton;
