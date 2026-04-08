import { useEffect, useRef, useMemo, useCallback, memo, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typography } from "@mui/material";
import { Canvas, useFrame } from "@react-three/fiber";

import advisory   from "../assets/images/view-professional-business-people-working-together.jpg";
import transaction from "../assets/images/mobile-business-analytics.jpg";
import bridging    from "../assets/images/technology-hologram-indoors.jpg";
import trade       from "../assets/images/businessman-analyzing-stock-market-data-modern-office.jpg";

import "./services.css";

gsap.registerPlugin(ScrollTrigger);

const data = [
  { title: "CORPORATE ADVISORY",  img: advisory    },
  { title: "TRANSACTION SUPPORT", img: transaction },
  { title: "BRIDGING SOLUTIONS",  img: bridging    },
  { title: "TRADE FINANCE",       img: trade       },
];

/* ── Stable particle positions generated once outside the component ── */
const PARTICLE_POSITIONS = new Float32Array(
  new Array(120)
    .fill(null)
    .flatMap(() => [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
    ])
);

/* ── Particles: memo so it never re-renders, useRef avoids re-creation ── */
const Particles = memo(function Particles() {
  const ref = useRef();

  useFrame(() => {
    const progress =
      window.scrollY / (document.body.scrollHeight - window.innerHeight) || 0;
    ref.current.rotation.y += 0.0005;
    ref.current.rotation.x = progress * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={120}
          array={PARTICLE_POSITIONS}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.008} color="#00ffff" transparent opacity={0.4} />
    </points>
  );
});

/* ── Top-branch positions (stable reference) ── */
const BRANCH_PERCENTS = [20, 40, 60, 80];

const Services = () => {
  const containerRef = useRef(null);
  const lineRef      = useRef(null);

  /* Guard: skip heavy timeline animations on small screens */
  const isMobile = useMemo(
    () => window.matchMedia("(max-width: 900px)").matches,
    []
  );

  /* Stable mousemove / mouseleave handlers */
  const attachHoverHandlers = useCallback((items) => {
    if (isMobile) return; // touch devices don't need this
    items.forEach((el) => {
      const img = el.querySelector(".image");

      const onMove = (e) => {
        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        gsap.to(img, {
          x: x * 15, y: y * 15,
          rotateX: y * -5, rotateY: x * 5,
          duration: 0.5, ease: "power3.out",
          overwrite: "auto",
        });
      };

      const onLeave = () =>
        gsap.to(img, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.7, overwrite: "auto" });

      el.addEventListener("mousemove", onMove,  { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });

      /* Store refs for cleanup */
      el._onMove  = onMove;
      el._onLeave = onLeave;
    });
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");

      /* Parallax on the whole section */
      gsap.to(containerRef.current, {
        y: -80, ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", end: "bottom bottom",
          scrub: 2,
        },
      });

      /* Skip line/branch/node animations on small screens (they're hidden via CSS) */
      if (!isMobile) {
        gsap.to(lineRef.current, {
          scaleY: 1, transformOrigin: "top center", ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", end: "bottom bottom",
            scrub: 1.5,
          },
        });

        gsap.fromTo(
          ".top-branch",
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1, opacity: 0.6, stagger: 0.08, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 95%" },
          }
        );

        gsap.fromTo(
          ".bottom-branch",
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1, opacity: 0.6, stagger: 0.1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "bottom 80%" },
          }
        );
      }

      /* Per-item scroll animations */
      items.forEach((el, i) => {
        const image = el.querySelector(".image");
        const text  = el.querySelector(".text");
        const node  = el.querySelector(".node");

        gsap.set([image, text], { opacity: 0, y: 120, scale: 0.95 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%", end: "top 30%",
            scrub: 1.2,
          },
        });

        if (!isMobile && node) tl.to(node, { scale: 1.6 });
        tl.to(image, { opacity: 1, y: 0, scale: 1, rotateY: i % 2 === 0 ? -3 : 3 }, 0);
        tl.to(text,  { opacity: 1, y: 0, scale: 1 }, 0.1);
      });

      attachHoverHandlers(items);
    }, containerRef);

    return () => {
      /* Clean up manual listeners that gsap.context doesn't track */
      gsap.utils.toArray(".timeline-item").forEach((el) => {
        if (el._onMove)  el.removeEventListener("mousemove",  el._onMove);
        if (el._onLeave) el.removeEventListener("mouseleave", el._onLeave);
      });
      ctx.revert();
    };
  }, [isMobile, attachHoverHandlers]);

  return (
    <div ref={containerRef} className="services-container">

      {/* WebGL particle background — suspended so it never blocks render */}
      <div className="services-canvas-wrap">
        <Suspense fallback={null}>
          <Canvas>
            <Particles />
          </Canvas>
        </Suspense>
      </div>

      {/* TOP BRANCHES */}
      <div className="services-top-branches">
        {BRANCH_PERCENTS.map((pct, i) => (
          <div
            key={i}
            className="top-branch"
            style={{ left: `${pct}%` }}
          />
        ))}
        <div className="services-top-bar" />
      </div>

      {/* MAIN TIMELINE LINE */}
      <div className="services-main-line" />
      <div ref={lineRef} className="services-main-line-glow" />

      {/* BOTTOM SPLIT BRANCHES */}
      <div className="services-bottom-branches">
        <div className="bottom-branch" style={{ left: "25%" }} />
        <div className="bottom-branch" style={{ left: "75%" }} />
        <div className="services-bottom-bar" />
      </div>

      {/* TIMELINE ITEMS */}
      {data.map((item, i) => (
        <div
          key={i}
          className={`timeline-item timeline-item--${i % 2 === 0 ? "left" : "right"}`}
        >
          <div className="node" />

          <div className="image">
            <img src={item.img} alt={item.title} loading="lazy" decoding="async" />
            <div className="image-overlay" />
          </div>

          <div className="text">
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.6rem" },
                letterSpacing: "-0.03em",
              }}
            >
              {item.title}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
