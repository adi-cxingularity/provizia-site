import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Typography } from "@mui/material";
import Particles from "./Particles";
import { useScroll } from "framer-motion";

import advisory from "../assets/images/view-professional-business-people-working-together.jpg";
import transaction from "../assets/images/mobile-business-analytics.jpg";
import bridging from "../assets/images/technology-hologram-indoors.jpg";
import trade from "../assets/images/tradeFinance.jpg";

const slidesData = [
  { title: "CORPORATE ADVISORY", img: advisory },
  { title: "TRANSACTION SUPPORT", img: transaction },
  { title: "BRIDGING SOLUTIONS", img: bridging },
  { title: "TRADE FINANCE", img: trade },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight;

      // Only run when section is in view
      if (sectionTop <= 0 && Math.abs(sectionTop) <= sectionHeight) {
        const progress = Math.abs(sectionTop) / sectionHeight;

        const index = Math.min(
          slidesData.length - 1,
          Math.floor(progress * slidesData.length),
        );

        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[500vh]">
      {/* ✅ FIXED PARTICLE BACKGROUND */}
      {/* <div className="absolute inset-0 z-0">
        <Particles scrollYProgress={scrollYProgress} />
      </div> */}

      {/* Sticky Content */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10">
        <div className="grid md:grid-cols-2 w-full max-w-6xl px-6 md:px-12">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            {/* Pagination */}
            <div className="flex gap-2 mb-10">
              {slidesData.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "w-12 bg-white" : "w-6 bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Titles */}
            <div className="relative min-h-[120px]">
              {slidesData.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute transition-all duration-700 ${
                    i === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",
                      fontWeight: 800,
                      fontSize: { xs: "2rem", md: "3rem" },
                    }}
                  >
                    {slide.title}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-[80%] h-[70vh] overflow-hidden border-2 border-cyan-500/20 shadow-[0px_0px_50px_rgba(0,255,255,0.2)] backdrop-blur-lg">
              <div
                className="absolute w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateY(-${activeIndex * 100}%)`,
                }}
              >
                {slidesData.map((slide, i) => (
                  <div key={i} className="h-full w-full relative">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="h-full w-full object-cover justify-center items-center"
                    />

                    {/* Cyan Mask Overlay */}
                    <div className="absolute inset-0 bg-cyan-400/35 mix-blend-color-burn pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
