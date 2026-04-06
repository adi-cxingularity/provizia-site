import { Canvas, useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import ModernCard from "../assets/ui-components/ModernCard";
import { Box, Typography } from "@mui/material";

//assets
import plant from "../assets/images/Firefly_Remove background 94251.png";
import coin from "../assets/images/Firefly_Remove background 233643.png";
import particles from "../assets/images/vecteezy_abstract-winter-morning-shiny-white-snow-is-falling-randomly_42335982.jpg";

// 🌿 Plant Component
function Plant() {
  const ref = useRef();

  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    // Plant grows and moves
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

// 🌿 Layered Parallax Component
function ParallaxLayers({ layers = [] }) {
  const group = useRef();

  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / maxScroll;

    group.current.children.forEach((layer, i) => {
      // Each layer moves at slightly different speeds
      layer.position.y = THREE.MathUtils.lerp(
        -1,
        1,
        progress * (0.5 + i * 0.2),
      );
      layer.position.z = -i * 0.5; // depth for perspective
      layer.scale.setScalar(1 + i * 0.1); // subtle size difference
    });
  });

  return (
    <group ref={group}>
      {layers.map((url, i) => (
        <Image
          key={i}
          url={url}
          transparent
          backgroundSize="cover"
          scale={[3 + i, 3.75 + i * 1.25, 1]}
        />
      ))}
    </group>
  );
}

// 💡 Lighting
function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
    </>
  );
}

// Motion wrapper for text sections
function AnimatedText({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" }); // triggers every entry
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay },
      });
    } else {
      controls.start({ opacity: 0, x: 50, transition: { duration: 0.5 } });
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

// 🎬 Main Split-Screen Scene
export default function Scene() {
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Left side: Sticky Canvas */}
        <div
          style={{
            flex: 1,
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <Canvas camera={{ position: [0, 2, 2], fov: 20 }}>
            {" "}
            <Lights />
            {/* <Plant /> */}
            {/* <ParallaxLayers layers={[plant, coin]} /> */}
          </Canvas>
        </div>

        {/* Right side: Scrollable text */}
        <div
          style={{
            flex: 1,
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Roboto, sans-serif",
            fontSize: "1.2rem",
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
    </>
  );
}
