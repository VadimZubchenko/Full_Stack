import "./App.css";
import { useState } from "react";
import NameForm from "./NameForm";

function App() {
  const [state, setState] = useState({
    greeting: " No greeting yet",
  });

  const setGreeting = (name) => {
    setState({
      greeting: "Hello " + name,
    });
  };
  // props of NameForm uses function setGreetin()
  return (
    <div className="App">
      <NameForm setGreeting={setGreeting} />
      <h2>Greeting: {state.greeting}</h2>
    </div>
  );
}

export default App;
