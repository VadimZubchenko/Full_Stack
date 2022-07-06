import "./App.css";
import { useDispatch, useSelector } from "react-redux";

// here we create the Selector
function App() {
  //dispatch recalls countReducer() from countReducer.js and update the state in the Store
  const dispatch = useDispatch();
  // this hook compares state and makes re-rendering the page
  const counter = useSelector((state) => {
    console.log("In selector, state", state); //in console it's printed 2 times, because the state and Store are changed
    return state.counter; // this return counter value in JSX <h2>, see below
  });

  const increment = () => {
    console.log("App + increment()");
    // this is ACTION, which dispatch recall countReducer() from countReducer.js
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
