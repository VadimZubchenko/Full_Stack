import "./App.css";
import GreetFunc from "./Components/GreetFunc";
import GreetClass from "./Components/GreetClass";

function App() {
  return (
    <div className="App">
      <h1>Hello Vadim!!!</h1>
      <GreetFunc name="Vadim as an attribute" surname="Zubchenko">
        <p>Here is children props.</p>
      </GreetFunc>
      <GreetFunc name="Vadim" surname="Zubchenko">
        <button>Button as a children</button>
      </GreetFunc>
      <GreetClass name="Vadim Zubchenko" />
      <GreetClass name="Tatiana Zaitseva" />
      <GreetClass name="Artur Zubchenko" />
    </div>
  );
}

export default App;
