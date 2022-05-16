import "./App.css";
import { useState, useEffect } from "react";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import LoginPage from "./LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";

// muista että tähän ei kirjoita suoraan callBack,
// koska tä render jo valmis muutokset
// sen takian kutsutaan fetching kautta
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

  useEffect(() => {
    if (sessionStorage.getItem(state)) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      setState(state);
      if (state.isLogged) {
        getShoppingList(state.token);
      }
    }
  }, []);

  const saveToStorage = (state) => {
    sessionStorage.setItem("state", JSON.stringify(state));
  };

  //APP STATE FUNCTIONS

  const setLoading = (loading) => {
    setState((state) => {
      return {
        ...state,
        loading: loading,
        error: "",
      };
    });
  };

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
      setLoading(true);
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
            setError("Register success");
            return;
          case "login":
            let token = await response.json();
            setState((state) => {
              let tempState = {
                ...state,
                isLogged: true,
                token: token.token,
              };
              saveToStorage(tempState);
              return tempState;
            });
            getShoppingList(token.token);
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
