import "./App.css";
import { useDispatch, useSelector } from "react-redux";

// here we create the Selector
function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => {
    console.log("In selector, state", state);
    return state.counter;
  });

  const increment = () => {
    console.log("App + increment()");
    // this is ACTION
    dispatch({
      type: "INCREMENT",
    });
  };

  const decrement = () => {
    console.log("App - decrement()");
    // this is ACTION
    dispatch({
      type: "DECREMENT",
    });
  };

  return (
    <div className="App">
      <h2>Counter:{counter}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
