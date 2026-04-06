import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Stars({ scrollYProgress }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(8000);
    for (let i = 0; i < 8000; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const scroll = scrollYProgress.get();

    // 🎯 Target camera positions
    const targetZ = 2 + scroll * 4;
    const targetX = Math.sin(scroll * Math.PI) * 1.2;
    const targetY = Math.cos(scroll * Math.PI) * 0.5;

    // 🧊 Frame-rate independent damping
    const damping = 1 - Math.exp(-4 * delta);

    state.camera.position.z += (targetZ - state.camera.position.z) * damping;
    state.camera.position.x += (targetX - state.camera.position.x) * damping;
    state.camera.position.y += (targetY - state.camera.position.y) * damping;

    state.camera.lookAt(0, 0, 0);

    // ✨ Subtle star field drift (adds life)
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
      ref.current.rotation.x += 0.0002;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#e5cf08"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingShapes({ scrollYProgress }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;

    const scroll = scrollYProgress.get();

    // 🎯 Smooth rotation using damping
    const targetRotY = scroll * Math.PI * 2;

    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotY,
      0.05,
    );

    ref.current.rotation.x += 0.003;
  });

  return (
    <mesh ref={ref} position={[2.5, 0, 0]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#00ffff"
        wireframe
        opacity={0.2}
        transparent
      />
    </mesh>
  );
}

export default function Scene3D({ scrollYProgress }) {
  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 3], fov: 75 }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} />

      <Stars scrollYProgress={scrollYProgress} />
      <FloatingShapes scrollYProgress={scrollYProgress} />
    </Canvas>
  );
}
