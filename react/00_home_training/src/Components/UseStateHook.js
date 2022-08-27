import React, { useState } from "react";

const UseStateHook = () => {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  const increment5 = () => {
    for (let i = 0; i < 5; i++) {
      setCount((prevState) => prevState + 1);
    }
  };

  return (
    <div style={{ width: 500, backgroundColor: "lightgreen", margin: "auto" }}>
      <h1>Count:{count}</h1>
      <button
        style={{ color: "blue", backgroundColor: "lightblue" }}
        onClick={() => setCount((prevCount) => prevCount - 1)}
      >
        Decrement
      </button>
      <button
        style={{ color: "red", backgroundColor: "pink" }}
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        Increment
      </button>
      <button
        style={{ color: "white", backgroundColor: "green" }}
        onClick={increment5}
      >
        5+
      </button>
      <br />
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
        onClick={() => setCount(initialCount)}
      >
        Reset
      </button>
    </div>
  );
};

export default UseStateHook;
