import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#b08227",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default theme;
