import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";

function App() {
  const [state, setState] = useState({
    list: [],
    isLogged: false,
    token: "",
    loading: false,
    error: "",
  });
  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: "",
  });

  //STORAGE FUNCTIOINS
  //Runs only on the first render, because => }, []);
  useEffect(() => {
    // saving session on the web-browser gives opportunity reload page into same state
    // without that it goes comeback to loginpage
    // first 'true' will be just after case of action: "register" and setError's saveToStorage(tempState);
    if (sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      setState(state);
      if (state.isLogged) {
        //loads the getShoppList(token) after reloading the page
        getShoppingList(state.token);
      }
    }
  }, []);

  const saveToStorage = (state) => {
    sessionStorage.setItem("state", JSON.stringify(state));
  };

  //APP STATE FUNCTIONS
  //differente page states for sessionStorage

  //update state with 'loading' status as a argument: false or true
  const setLoading = (loading) => {
    setState((state) => {
      return {
        ...state,
        loading: loading,
        error: "",
      };
    });
  };
  //update state with passing message as a argument
  //and save state into sessionStorage
  const setError = (error) => {
    setState((state) => {
      let tempState = {
        ...state,
        error: error,
      };
      saveToStorage(tempState);
      return tempState;
    });
  };

  const clearState = () => {
    let state = {
      list: [],
      isLogged: false,
      token: "",
      loading: false,
      error: "",
    };
    saveToStorage(state);
    setState(state);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!urlRequest.url) {
        return;
      }
      //next one changes a state without rendering!
      setLoading(true); //return 'messageArea' with <h4>Loading...<h4> see below Condition rendering
      let response = await fetch(urlRequest.url, urlRequest.request);
      setLoading(false);
      if (response.ok) {
        switch (urlRequest.action) {
          case "getlist":
            let data = await response.json();
            setState((state) => {
              let tempState = {
                ...state,
                list: data,
              };
              // saving the page state into sessionStorage
              saveToStorage(tempState);
              return tempState;
            });
            return;
          case "additem":
            getShoppingList();
            return;
          case "removeitem":
            getShoppingList();
            return;
          case "edititem":
            getShoppingList();
            return;
          case "register":
            setError("Register success"); // methood updates STATE with error: "Register succes" and first time saveToStorage see above
            return;
          case "login":
            let resp = await response.json();
            setState((state) => {
              // isLogged == true ,state.isLogged changes to true, see above
              // which opens other tempRender page, see below
              let tempState = {
                ...state,
                isLogged: true,
                token: resp.token, //because in resp. the token is under name 'token'
              };
              // saving the page state into sessionStorage
              saveToStorage(tempState);
              return tempState;
            });
            getShoppingList(resp.token);
            return;
          case "logout":
            clearState();
            return;
          default:
            return;
        }
      } else {
        if (response.status === 403) {
          clearState();
          setError("Your session has expired. Logging you out!");
          return;
        }
        //TODO: handle all different failed requests for the backend
        switch (urlRequest.action) {
          case "getlist":
            setError(
              "Failed to retrieve shopping list. Server responded with a status:" +
                response.status
            );
            return;
          case "additem":
            setError(
              "Failed to retrieve shopping list. Server responded with a status:" +
                response.status
            );
            return;
          case "removeitem":
            setError(
              "Failed to retrieve shopping list. Server responded with a status:" +
                response.status
            );
            return;
          case "edititem":
            setError(
              "Failed to retrieve shopping list. Server responded with a status:" +
                response.status
            );
            return;
          case "register":
            if (response.status === 409) {
              setError("Username already in use. Try another.");
            } else {
              setError(
                "Failed to register new user. Server responded with a status:" +
                  response.status
              );
            }
            return;
          case "login":
            setError(
              "Failed to login user. Server responded with a status:" +
                response.status
            );
            return;
          default:
            return;
        }
      }
    };
    fetchData();
  }, [urlRequest.url, urlRequest.request, urlRequest.action]);

  //LOGIN API

  const register = (user) => {
    // user={username, password}
    // change state of 'urlRequest' and triggers component updating with useEffect()
    setUrlRequest({
      url: "/register",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      },
      action: "register",
    });
  };

  const login = (user) => {
    setUrlRequest({
      url: "/login",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      },
      action: "login",
    });
  };

  const logout = () => {
    setUrlRequest({
      url: "/logout",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Counter-type": "application/json", token: state.token },
      },
      action: "logout",
    });
  };

  // REST API
  // getShoppingList() or  getShoppingList(argument)
  const getShoppingList = (token) => {
    let temptoken = state.token;
    if (token) {
      temptoken = token;
    }

    setUrlRequest({
      url: "/api/shopping",
      request: {
        method: "GET",
        mode: "cors",
        //The token is placed into headers.
        headers: { "Content-type": "application/json", token: temptoken },
      },
      action: "getlist",
    });
  };
  const addShoppingItem = (item) => {
    setUrlRequest({
      url: "/api/shopping",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json", token: state.token },
        body: JSON.stringify(item),
      },
      action: "additem",
    });
  };

  const removeFromList = (id) => {
    setUrlRequest({
      url: "/api/shopping/" + id,
      request: {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-type": "application/json", token: state.token },
      },
      action: "removeitem",
    });
  };

  const editItem = (item) => {
    setUrlRequest({
      url: "/api/shopping/" + item.id,
      request: {
        method: "PUT",
        mode: "cors",
        headers: { "Content-type": "application/json", token: state.token },
        body: JSON.stringify(item),
      },
      action: "edititem",
    });
  };

  //CONDITION RENDERING
  // the message will show every rendering while state error parameter change for instance "Register success" or empty"..."
  let messageArea = <h4></h4>;
  if (state.loading) {
    messageArea = <h4>Loading...</h4>;
  }

  if (state.error) {
    messageArea = <h4>{state.error}</h4>;
  }

  let tempRender = (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <LoginPage setError={setError} register={register} login={login} />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  if (state.isLogged) {
    tempRender = (
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ShoppingList
              list={state.list}
              removeFromList={removeFromList}
              editItem={editItem}
            />
          }
        />
        <Route
          path="/form"
          element={<ShoppingForm addShoppingItem={addShoppingItem} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <div className="App">
      <Navbar isLogged={state.isLogged} logout={logout} />
      {messageArea}
      <hr />
      {tempRender}
    </div>
  );
}

export default App;
