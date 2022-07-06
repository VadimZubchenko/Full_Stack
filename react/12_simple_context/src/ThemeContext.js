import React from "react";

export const themes = {
  light: {
    color: "#000000",
    backgroundColor: "#d3d3d3",
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#595959",
  },
};
// here we declare themes for other components via context
export const ThemeContext = React.createContext(themes.dark);

ThemeContext.displayName = "ThemeContext";
