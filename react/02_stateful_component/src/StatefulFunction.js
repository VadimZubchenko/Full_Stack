import { useState, useEffect } from "react";
// hooks — нововведение в React 16.8, которое позволяет использовать
//состояние и другие возможности React без написания классов.

const StatefulFunction = (props) => {
  const [state, setState] = useState({
    seconds: 0,
    timerId: 0,
  });
  // se treggoroi ja muodostaa tyhjän array
  useEffect(() => {
    let interval = setInterval(startTimer, 1000);
    setState((state) => {
      return {
        // ... spread operator, kaikki loput parametrit muuttuu
        ...state,
        timerId: interval,
      };
    });
    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    setState((state) => ({
      ...state,
      seconds: state.seconds + 1,
    }));
  };
  return (
    <h2>
      Function component says that you have been on this page for{" "}
      {state.seconds} seconds
    </h2>
  );
};

export default StatefulFunction;
