import { Canvas, useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Typography, useTheme, useMediaQuery } from "@mui/material";

// assets
import plant from "../assets/images/Firefly_Remove background 94251.png";
import coin from "../assets/images/Firefly_Remove background 233643.png";

/* 🌿 Optional Plant */
function Plant() {
  const ref = useRef();

  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    const scale = THREE.MathUtils.lerp(0.5, 1.8, progress);
    ref.current.scale.set(scale, scale, scale);

    ref.current.position.y = THREE.MathUtils.lerp(-1, 1, progress);
    ref.current.rotation.z = Math.sin(progress * Math.PI) * 0.1;
  });

  return (
    <group ref={ref}>
      <Image url={plant} transparent scale={[2, 2.5, 1]} />
    </group>
  );
}

/* 💡 Lights */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
    </>
  );
}

/* ✨ Animated Text */
function AnimatedText({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay },
      });
    } else {
      controls.start({
        opacity: 0,
        x: 50,
        transition: { duration: 0.5 },
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={controls}
      style={{ marginBottom: "2rem", width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

/* 🎬 MAIN COMPONENT */
export default function Scene() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        overflowX: "hidden", // ✅ prevents right-side gap
        backgroundColor: "rgb(16,16,16)",
      }}
    >
      {/* LEFT: Canvas */}
      <div
        style={{
          flex: isMobile ? "none" : 1,
          position: isMobile ? "relative" : "sticky",
          top: 0,
          height: isMobile ? "300px" : "100vh",
        }}
      >
        <Canvas camera={{ position: [0, 2, 2], fov: 20 }}>
          <Lights />
          {/* <Plant /> */}
        </Canvas>
      </div>

      {/* RIGHT: TEXT */}
      <div
        style={{
          flex: isMobile ? "none" : 1,
          padding: isMobile ? "2rem 1rem" : "4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "Roboto, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <AnimatedText delay={0}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            CORPORATE ADVISORY
          </Typography>
        </AnimatedText>

        <AnimatedText delay={0.2}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            TRANSACTION SUPPORT
          </Typography>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            BRIDGING SOLUTIONS
          </Typography>
        </AnimatedText>

        <AnimatedText delay={0.6}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            TRADE FINANCE
          </Typography>
        </AnimatedText>
      </div>
    </div>
  );
}
