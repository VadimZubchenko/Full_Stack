import React from "react";

const GreetFunc = (props) => {
  const showText = "The text below is a second children.";
  return (
    <div>
      <p>
        Hello {props.name} {props.surname} and Hello {props.message}
      </p>
      {props.children}
      <br />
      {showText}
      <hr />
    </div>
  );
};

export default GreetFunc;
