import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// tässä se ottaa käytöön index.html:in HTML-div 'root'(toimi niin kuin ankkuri) ja renderoi sitä
const root = ReactDOM.createRoot(document.getElementById("root"));
// <App>(nimi voi vaihta) on main tiedosto, jossa merkitty kaikki web-sivun tapahtumat
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
