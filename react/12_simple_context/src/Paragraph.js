import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Paragraph = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <h1
      style={{
        color: theme.color,
        backgroundColor: theme.backgrouhndColor,
      }}
    >
      {props.children}
    </h1>
  );
};
export default Paragraph;
