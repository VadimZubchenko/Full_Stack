import { useContext, useEffect, useState } from "react";
import ActionContext from "../context/ActionContext";
import * as ActionConstants from "../types/actionConstants";
import useAppState from "./useAppState";

const useAction = () => {
  const action = useContext(ActionContext);
  const [state, setState] = useState({
    url: "",
    request: {},
    action: "",
  });

  const { token } = useAppState();

  //Backend communication with useEffect()

  useEffect(() => {
    const contactBackend = async () => {
      if (!state.url) {
        return;
      }
      action.dispatch({
        type: ActionConstants.LOADING,
      });
      const response = await fetch(state.url, state.request);
      action.dispatch({
        type: ActionConstants.STOP_LOADING,
      });
      if (!response) {
        action.dispatch({
          type: ActionConstants.LOGOUT_FAILED,
          error: "There was an error with your connection. Logging you out!",
        });
      }
      if (response.ok) {
        switch (state.action) {
          case "register":
            action.dispatch({
              type: ActionConstants.REGISTER_SUCCESS,
            });
            return;
          case "login":
            const data = await response.json();
            if (!data) {
              action.dispatch({
                type: ActionConstants.LOGIN_FAILED,
                error: "Error parsing login information",
              });
              return;
            }
            action.dispatch({
              type: ActionConstants.LOGIN_SUCCESS,
              token: data.token,
            });
            return;
          case "logout":
            action.dispatch({
              type: ActionConstants.LOGOUT_SUCCESS,
            });
            return;
          case "getlist":
            const list = await response.json();
            if (!list) {
              action.dispatch({
                type: ActionConstants.FETCH_LIST_FAILED,
                error: "Error parsing shopping information!",
              });
              return;
            }
            action.dispatch({
              type: ActionConstants.FETCH_LIST_SUCCESS,
              list: list,
            });
            return;
          case "additem":
            action.dispatch({
              type: ActionConstants.ADD_ITEM_SUCCESS,
            });
            getList();
            return;
          case "removeitem":
            action.dispatch({
              type: ActionConstants.REMOVE_ITEM_SUCCESS,
            });
            getList();
            return;
          case "edititem":
            action.dispatch({
              type: ActionConstants.EDIT_ITEM_SUCCESS,
            });
            getList();
            return;
          default:
            return;
        }
      } else {
        switch (state.action) {
          case "register":
            if (response.status === 409) {
              action.dispatch({
                type: ActionConstants.REGISTER_FAILED,
                error: "Username already in use",
              });
            } else {
              action.dispatch({
                type: ActionConstants.REGISTER_FAILED,
                error: "Server responded with a status:" + response.status,
              });
            }
            return;
          case "login":
            action.dispatch({
              type: ActionConstants.LOGIN_FAILED,
              error: "Server responded with a status:" + response.status,
            });
            return;
          case "logout":
            action.dispatch({
              type: ActionConstants.LOGOUT_FAILED,
              error:
                "Server responded with error when removing session. Logging you out!",
            });
            return;
          case "getlist":
            if (response.status === 403) {
              action.dispatch({
                type: ActionConstants.LOGOUT_SUCCESS,
              });
              action.dispatch({
                type: ActionConstants.FETCH_LIST_FAILED,
                error: "Session expired. Logging you out!",
              });
              return;
            }
            action.dispatch({
              type: ActionConstants.FETCH_LIST_FAILED,
              error: "Server responded with a status:" + response.status,
            });
            return;
          case "additem":
            if (response.status === 403) {
              action.dispatch({
                type: ActionConstants.LOGOUT_SUCCESS,
              });
              action.dispatch({
                type: ActionConstants.ADD_ITEM_FAILED,
                error: "Session expired. Logging you out!",
              });
              return;
            }
            action.dispatch({
              type: ActionConstants.ADD_ITEM_FAILED,
              error: "Server responded with a status:" + response.status,
            });
            return;
          case "removeitem":
            if (response.status === 403) {
              action.dispatch({
                type: ActionConstants.LOGOUT_SUCCESS,
              });
              action.dispatch({
                type: ActionConstants.REMOVE_ITEM_FAILED,
                error: "Session expired. Logging you out!",
              });
              return;
            }
            action.dispatch({
              type: ActionConstants.REMOVE_ITEM_FAILED,
              error: "Server responded with a status:" + response.status,
            });
            return;
          case "edititem":
            if (response.status === 403) {
              action.dispatch({
                type: ActionConstants.LOGOUT_SUCCESS,
              });
              action.dispatch({
                type: ActionConstants.EDIT_ITEM_FAILED,
                error: "Session expired. Logging you out!",
              });
              return;
            }
            action.dispatch({
              type: ActionConstants.EDIT_ITEM_FAILED,
              error: "Server responded with a status:" + response.status,
            });
            return;
          default:
            return;
        }
      }
    };

    contactBackend();
  }, [state]);

  //Action generators for components

  const register = (user) => {
    setState({
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
    setState({
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
    setState({
      url: "/logout",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json", token: token },
      },
      action: "logout",
    });
  };

  const getList = () => {
    setState({
      url: "/api/shopping",
      request: {
        method: "GET",
        mode: "cors",
        headers: { "Content-type": "application/json", token: token },
      },
      action: "getlist",
    });
  };

  const add = (item) => {
    setState({
      url: "/api/shopping",
      request: {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json", token: token },
        body: JSON.stringify(item),
      },
      action: "additem",
    });
  };

  const remove = (id) => {
    setState({
      url: "/api/shopping/" + id,
      request: {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-type": "application/json", token: token },
      },
      action: "removeitem",
    });
  };

  const edit = (item) => {
    setState({
      url: "/api/shopping/" + item.id,
      request: {
        method: "PUT",
        mode: "cors",
        headers: { "Content-type": "application/json", token: token },
        body: JSON.stringify(item),
      },
      action: "edititem",
    });
  };

  return { register, login, logout, getList, add, remove, edit };
};

export default useAction;
