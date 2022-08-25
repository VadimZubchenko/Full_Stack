import React from "react";

const GreetFunc = (props) => {
  const showText = "This text is shown as a second children.";
  return (
    <div>
      <p>
        Hello {props.name} : {props.surname}
      </p>
      {props.children}
      <hr />
      {showText}
    </div>
  );
};

export default GreetFunc;
