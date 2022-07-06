import "./App.css";
import { useState, useEffect } from "react";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// muista että tähän ei kirjoita suoraan callBack,
// koska tä render jo valmis muutokset
// sen takian kutsutaan fetching kautta
function App() {
  // useSelector returns state or just selected
  // properties from Redux 'store'
  // 
  // This hook takes an optional 'equality' comparison function 
  // as the second parameter that allows you to customize
  // the way 
  // the selected state is compared to determine whether 
  // the component needs to be re-rendered and makes possible to re-render if the state is being changed
  const appState = useSelector((state) => state);

  //CONDITION RENDERING

  let messageArea = <h4></h4>;
  if (appState.login.loading) { //appState asks state "loading" from loginReducer, where .login is link(see index.js) to loginReducer(), which returns tempState{} object with state.loading 
    messageArea = <h4>Loading...</h4>;
  }
  let error = appState.shopping.error; //appState asks state "error" from shoppingReducer, where .shopping is link(see index.js) to shoppingReducer(), which returns tempState{} object with state.error  
  if (appState.login.error) {
    error = appState.login.error;
  }
  if (error) {
    messageArea = <h4>{error}</h4>;
  }
  let tempRender = (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  if (appState.login.isLogged) {
    tempRender = (
      <Routes>
        <Route exact path="/" element={<ShoppingList />} />
        <Route path="/form" element={<ShoppingForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <div className="App">
      <Navbar />
      {messageArea}
      <hr />
      {tempRender}
    </div>
  );
}

export default App;
