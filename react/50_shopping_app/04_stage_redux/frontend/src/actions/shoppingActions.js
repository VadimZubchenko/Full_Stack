import { loading, stopLoading, clearLoginState } from "./loginActions";

// Action constants

export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILED = "ADD_ITEM_FAILED";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE";

//ASync Action Creators

export const getList = (token) => {
  return async (dispatch) => {
    let request = {
      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json", token: token },
    };
    dispatch(loading());
    let response = await fetch("/api/shopping", request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(
        fetchListFailed(
          "There was an error with the connection. Fetching shoppinglist failed!"
        )
      );
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(fetchListFailed("Failed to parse shoppinglist!"));
        return;
      }
      dispatch(fetchListSuccess(data));
    } else {
      if (response.status === 403) {
        dispatch(clearShoppingState());
        dispatch(clearLoginState());
        dispatch(
          fetchListFailed("Your session has expired. Logging your out!")
        );
      } else {
        dispatch(
          fetchListFailed("Server responded with a status:" + response.status)
        );
      }
    }
  };
};

export const addItem = (token, item) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json", token: token },
      body: JSON.stringify(item),
    };
    dispatch(loading());

    let response = await fetch("/api/shopping", request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(
        addItemFailed(
          "There was an error with the connection. Add new item failed"
        )
      );
      return;
    }
    if (response.ok) {
      dispatch(addItemSuccess());
      dispatch(getList(token));
    } else {
      if (response.status === 403) {
        dispatch(clearShoppingState());
        dispatch(clearLoginState());
        dispatch(addItemFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(
          addItemFailed("Server responded with a status: " + response.status)
        );
      }
    }
  };
};

export const removeItem = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-type": "application/json", token: token },
    };

    dispatch(loading());

    let response = await fetch("/api/shopping/" + id, request);

    dispatch(stopLoading());
    if (!response) {
      dispatch(
        removeItemFailed(
          "There was and error with the connection. Remove item failed"
        )
      );
      return;
    }
    if (response.ok) {
      dispatch(removeItemSuccess());
      dispatch(getList(token));
    } else {
      if (response.status === 403) {
        dispatch(clearShoppingState());
        dispatch(clearLoginState());
        dispatch(
          removeItemFailed("Your session has expired. Logging you out!")
        );
      } else {
        dispatch(
          removeItemFailed("Server responded with a status: " + response.status)
        );
      }
    }
  };
};

export const edit = (token, item) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      mode: "cors",
      headers: { "Content-type": "application/json", token: token },
      body: JSON.stringify(item),
    };
    dispatch(loading());
    let response = await fetch("/api/shopping/" + item.id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(
        editItemFailed("There was an error the connection. Edit item failed!")
      );
      return;
    }
    if (response.ok) {
      dispatch(editItemSuccess());
      dispatch(getList(token));
    } else {
      if (response.status === 403) {
        dispatch(clearShoppingState());
        dispatch(clearLoginState());
        dispatch(editItemFailed("Your session has axpired. Logging you out!"));
      } else {
        dispatch(
          editItemFailed("Server responded with a status:" + response.status)
        );
      }
    }
  };
};

//Action Creators

const fetchListSuccess = (list) => {
  return {
    type: FETCH_LIST_SUCCESS,
    list: list,
  };
};

const fetchListFailed = (error) => {
  return {
    type: FETCH_LIST_FAILED,
    error: error,
  };
};
const addItemSuccess = () => {
  return {
    type: ADD_ITEM_SUCCESS,
  };
};
const addItemFailed = (error) => {
  return {
    type: ADD_ITEM_FAILED,
    error: error,
  };
};

const removeItemSuccess = () => {
  return {
    type: REMOVE_ITEM_SUCCESS,
  };
};
const removeItemFailed = (error) => {
  return {
    type: REMOVE_ITEM_FAILED,
    error: error,
  };
};
const editItemSuccess = () => {
  return {
    type: EDIT_ITEM_SUCCESS,
  };
};
const editItemFailed = (error) => {
  return {
    type: EDIT_ITEM_FAILED,
    error: error,
  };
};

export const clearShoppingState = () => {
  return {
    type: CLEAR_SHOPPING_STATE,
  };
};
