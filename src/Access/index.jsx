import React, { useRef, useEffect } from "react";
import AccessCard from "./AccessCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import roles from "./roles";
import { Typography } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const Access = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const totalWidth = el.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    gsap.to(el, {
      x: -(totalWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom top",
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen overflow-hidden"
      style={{ backgroundColor: "rgb(16,16,16), perspective: 1200px " }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "white",
          mb: 1,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        Access Portals
      </Typography>
      <div ref={scrollRef} className="flex items-center h-full gap-10 px-20">
        {roles.map((role, i) => (
          <AccessCard key={i} role={role} />
        ))}
      </div>
    </section>
  );
};

export default Access;
