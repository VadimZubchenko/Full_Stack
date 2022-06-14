import { useState, useEffect } from "react";
// hooks — нововведение в React 16.8, которое позволяет использовать
//состояние и другие возможности React без написания классов.

const StatefulFunction = (props) => {
  const [state, setState] = useState({
    seconds: 0,
    timerId: 0,
  });

  const startTimer = () => {
    setState((state) => ({
      ...state,
      seconds: state.seconds + 1,
    }));
  };

  // it's a close replacement for 
  // componentDidMount(), copmonentsDidUpdate, componentsWillUnmount in class,
  // se treggoroi ja muodostaa tyhjän array
  useEffect(() => {
    let interval = setInterval(startTimer, 1000);
    setState((state) => {
      return {
        // ... spread operator, kaikki array's loput parametrit muuttuu
        // allows us to quickly copy all or part of an existing
        // array or object into another array or object.
        ...state,
        timerId: interval,
      };
    });
    // like componentWillUnmount() in class
    return () => clearInterval(interval);
  }, []);

  return (
    <h2>
      Function component says that you have been on this page for{" "}
      {state.seconds} seconds
    </h2>
  );
};

export default StatefulFunction;
