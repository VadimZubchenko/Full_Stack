import "./App.css";
import HelloWorld from "./HelloWorld";
import HelloFunc from "./HelloFunc";

// se on render funktio, se pitää palautta jotakin. Siinä on kaksi kieltä JS ja JSX
function App() {
  // first line is HelloWorld with original propers name ='World'
  // second line with changed properte name="Vadim"
  // third line is HelloFunc with original propers name ≈ 'Func'
  // forth line with changed properte name="Erno"
  return (
    <div className="App">
      <HelloWorld />
      <HelloWorld name="Vadim" />
      <HelloFunc />
      <HelloFunc name="Erno" />
    </div>
  );
}

export default App;
