import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeButton = (props) => {
  // here we take themes from ThemeContext
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{
        color: theme.color,
        backgroundColor: theme.backgroundColor,
      }}
      onClick={props.toggleTheme}
    >
      Toggle Theme
    </button>
  );
};
export default ThemeButton;
