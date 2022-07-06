import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import loginReducer from "./reducers/loginReducer";
import shoppingReducer from "./reducers/shoppingReducer";
// viivattu vain, että ei suositella käyttää
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  login: loginReducer,
  shopping: shoppingReducer,
});
// applyMiddleware(thunk) creates a store enhancer that applies middleware to the dispatch method
// of the Redux store. This is handy for a variety of tasks, such as expressing asynchronous actions
//in a concise manner, or logging every action payload.
const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
