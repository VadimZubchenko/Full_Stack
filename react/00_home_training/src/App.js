import "./App.css";
import GreetFunc from "./Components/GreetFunc";
import GreetClass from "./Components/GreetClass";
import ClassState from "./Components/ClassState";
import { useState } from "react";
import FuncState from "./Components/FuncState";
import UseStateHook from "./Components/UseStateHook";

function App() {
  const [state, setState] = useState({
    message: "useState!",
  });

  const changeMessage = () => {
    setState(() => {
      return { message: "World!" };
    });
  };

  return (
    <div className="App">
      {/* <h1>Hello Vadim!!!</h1>
      <GreetFunc name="Vadim as an attribute" surname="Zubchenko">
        <p>Here is children props.</p>
      </GreetFunc>
      <GreetFunc name="Vadim" surname="Zubchenko" message={state.message}>
        <button onClick={changeMessage}>Button as a children</button>
      </GreetFunc>
      <GreetClass name="Vadim Zubchenko" />
      <GreetClass name="Tatiana Zaitseva" />
      <GreetClass name="Artur Zubchenko" />*/}
      <ClassState name="name" surname="surname" />
      <FuncState />
      <UseStateHook />
    </div>
  );
}

export default App;
