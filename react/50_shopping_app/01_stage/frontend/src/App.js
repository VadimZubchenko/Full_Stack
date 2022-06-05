import "./App.css";
import { useState, useEffect } from "react";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// muista että tähän ei kirjoita suoraan callBack,
// koska tä render jo valmis muutokset
// sen takian kutsutaan fetching kautta
function App() {
  // here two differents states (state and urlRequest)
  const [state, setState] = useState({
    list: [],
  });
  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: "",
  });
  // useEffect equivalent of componentDidMount in class: place to make ajax requests
  useEffect(() => {
    const fetchData = async () => {
      if (!urlRequest.url) {
        return;
      }
      // when method, esim. addShoppingItem updates urlRequest state, then it trigeres await fetch
      //send url and reques type and odotan vastausta from local server.js esim. fetch(/api/shopping, post)
      let response = await fetch(urlRequest.url, urlRequest.request);
      if (response.ok) {
        switch (urlRequest.action) {
          case "getlist":
            let data = await response.json();
            // add responded data into first 'state'
            setState({
              list: data,
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
          default:
            return;
        }
      } else {
        //TODO: handle all different failed requests for the backend
        switch (urlRequest.action) {
          case "getlist":
            console.log(
              "Failed to retrieve shopping list. Server responded with a status",
              response.status
            );
            return;
          case "additem":
            console.log(
              "Failed to add new item. Server responded with a status",
              response.status
            );
            return;
          case "removeitem":
            console.log(
              "Failed to remove item. Server responded with a status",
              response.status
            );
            return;
          case "edititem":
            console.log(
              "Failed to edit item. Server responded with a status",
              response.status
            );
            return;
          default:
            return;
        }
      }
    };
    fetchData();
    // ,[] – dependency array
    // [empty] the hook will only trigger once when the component is first rendered.
    // hook will trigger if any element of the dependency array changes:
  }, [urlRequest.url, urlRequest.request, urlRequest.action]);

  const getShoppingList = () => {
    // this is change second 'urlRequest' state and trigger useEffect, fetch
    setUrlRequest({
      url: "/api/shopping",
      request: {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json" }, //makes possible to get in data in json
      },
      action: "getlist",
    });
  };
  // after receiving the item data from children comp. ShoppongForm.js input
  const addShoppingItem = (item) => {
    setUrlRequest({
      url: "/api/shopping",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
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
        headers: { "Content-type": "application/json" },
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
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(item),
      },
      action: "edititem",
    });
  };
  return (
    <div className="App">
      <Navbar />
      <hr />
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
      </Routes>
    </div>
  );
}

export default App;
