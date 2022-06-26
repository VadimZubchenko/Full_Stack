import "./App.css";
import { useCount } from "./util/usecount";

function App() {
  // you can customize hooks for your own tasks,
  // for instance here we added 2 methods (add, substract)
  // into useCount hooks, but useCount is initiated in own 
  // fuction and uses inside  of own useState add and substract 
  // for changing value
  const [value, add, substract] = useCount(10);
  return (
    <div className="App">
      <h2>Value:{value}</h2>
      <br />
      <button onClick={add}>Add</button>
      <button onClick={substract}>Substract</button>
    </div>
  );
}

export default App;
