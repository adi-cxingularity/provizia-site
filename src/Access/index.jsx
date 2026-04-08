import React, { useRef } from "react";
import AccessCard from "./AccessCard";
import roles from "./roles";
import { Typography } from "@mui/material";

const Access = () => {
  const cardRefs = useRef([]);
  cardRefs.current = [];

  return (
    <section
      style={{
        backgroundColor: "rgb(16,16,16)",
        padding: "4rem 1rem",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "white",
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.8rem", md: "3rem" },
        }}
      >
        Access Portals
      </Typography>

      {/* 🔥 Responsive Layout */}
      <div
        className="
          flex 
          flex-col 
          md:flex-row 
          items-center 
          justify-center 
          gap-6 
          md:gap-10
          max-w-6xl 
          mx-auto
        "
      >
        {roles.map((role, i) => (
          <AccessCard
            key={i}
            role={role}
            index={i}
            registerRef={(el) => (cardRefs.current[i] = el)}
            onHover={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Access;
