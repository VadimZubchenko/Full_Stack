import "./App.css";
import { useState, useEffect } from "react";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// remember not to call callBack directly here,
// because this render already finished making changes
// therefore is called with fetch, see below
function App() {
  // here two differents states (state and urlRequest)
  const [state, setState] = useState({
    list: [],
  });
  // this state effects to useEffect below
  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: "",
  });
  // very first loading send request to server and check if database has any item.
  useEffect(() => {
    getShoppingList();
  }, []); // [empty] the hook will only trigger once when the component is first rendered.

  // useEffect equivalent of componentDidUpdate in class: place to make ajax requests
  useEffect(() => {
    const fetchData = async () => {
      if (!urlRequest.url) {
        return;
      }
      // when method, esim. addShoppingItem updates urlRequest state, then it trigeres await fetch
      //send url, request type and action and waits a respond from local server.js esim. fetch(/api/shopping, post)
      let response = await fetch(urlRequest.url, urlRequest.request);
      if (response.ok) {
        switch (urlRequest.action) {
          case "getlist":
            let data = await response.json();
            // add responded data into first state:'state'
            // setState tells React that the component and its children
            // should be re-rendered with the updated state.
            setState({
              list: data,
            });
            return;
          case "additem":
            //passed here if urlReques.action = additem
            //and print all items into page
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
    // hook will trigger if any element of the dependency array changes like componentDidChange()
  }, [urlRequest.url, urlRequest.request, urlRequest.action]);

  const getShoppingList = () => {
    // this is change second 'urlRequest' state and triggers useEffect, fetch
    // here state being changed
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
  // this triggers useEffect, fetch
  const addShoppingItem = (item) => {
    // here state being changed
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
