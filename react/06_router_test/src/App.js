import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Secret from "./components/Secret";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </div>
  );
}

export default App;
