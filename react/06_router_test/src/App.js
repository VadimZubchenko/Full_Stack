import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Secret from "./components/Secret";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/*The ul element defines an unordered (list list without number:)*/}
      <ul style={{ listStyleType: "none" }}>
        {/*The li list element*/}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        {/*lectur Erno wrote exact path="/", not it default bahave*/}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </div>
  );
}

export default App;
