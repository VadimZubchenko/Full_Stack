import logo from "./logo.svg";
import "./App.css";
import { useCount } from "./util/usecount";

function App() {
  const [value, add, substract] = useCount(10);
  return (
    <div className="App">
      <h2>Vallue:{value}</h2>
      <br />
      <button onClick={add}>Add</button>
      <button onClick={substract}>Substract</button>
    </div>
  );
}

export default App;
