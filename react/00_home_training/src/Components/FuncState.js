import React, { useState } from "react";

function FuncState() {
  const [state, setState] = useState({
    message_1: "Message 1 of useState.",
    message_2: "Message 2 of useState.",
  });

  const change = () => {
    setState((state) => {
      return {
        ...state,
        message_1: "Left is changed.",
      };
    });
  };

  const change2 = () => {
    setState((state) => {
      return {
        ...state,
        message_2: "Right is changed.",
      };
    });
  };
  return (
    <div style={{ width: 500, backgroundColor: "yellow", margin: "auto" }}>
      <h2>
        {state.message_1} || {state.message_2}
      </h2>
      <button
        style={{
          color: "red",
          fontSize: 20,
          fontWeight: "bold",
          backgroundColor: "#4EDDDD",
          maxWidth: "20px",
          maxHeight: "50px",
          minWidth: "190px",
          minHeight: "30px",
        }}
        onClick={change}
      >
        ChangeLeft
      </button>
      <button
        style={{
          color: "red",
          fontSize: 20,
          fontWeight: "bold",
          backgroundColor: "#4EDDDD",
          maxWidth: "20px",
          maxHeight: "50px",
          minWidth: "190px",
          minHeight: "30px",
        }}
        onClick={change2}
      >
        ChangeRight
      </button>
    </div>
  );
}

export default FuncState;
