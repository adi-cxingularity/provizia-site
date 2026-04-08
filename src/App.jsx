import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Routes, Route } from "react-router-dom";

// project imports
import "./App.css";
import "@fontsource/roboto";
import Hero from "./hero/index";
import Services from "./services";
import TrackRecord from "./trackRecord";
import Clients from "./clients";
import GlobeScene from "./global";
import Access from "./Access";
import ScrollToTopButton from "./assets/ui-components/ScrollToTopButton";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className=" min-h-screen p-6"
              backgroundColor="rgba(255, 255, 255, 0.05)"
            >
              <section id="hero">
                <Hero />
              </section>
              <section id="clients">
                <Clients />
              </section>

              <section id="globe">
                <GlobeScene />
              </section>

              <section id="track-record">
                <TrackRecord />
              </section>

              <section id="services">
                <Services />
              </section>

              <section id="access">
                <Access />
              </section>

              <ScrollToTopButton />
            </div>
          }
        />
        {/* <Route path="/#clients" element={<Clients />} />
        <Route path="/#globe" element={<GlobeScene />} />
        <Route path="/#services" element={<Services />} />
        <Route path="/#about" element={<Scene />} />
        <Route path="/#access" element={<Access />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
