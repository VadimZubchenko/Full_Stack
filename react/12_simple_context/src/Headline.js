import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Headline = (props) => {
  // here we take themes from ThemeContext
  const theme = useContext(ThemeContext);

  return (
    <h1
      style={{
        color: theme.color,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {props.children}
    </h1>
  );
};
export default Headline;
