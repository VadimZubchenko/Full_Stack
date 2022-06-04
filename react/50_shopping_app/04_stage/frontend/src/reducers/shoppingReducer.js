import {
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILED,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILED,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILED,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILED,
  CLEAR_SHOPPING_STATE,
} from "../actions/shoppingActions";

/*shopping state
{
  list:array,
   error:string
}
*/

const getInitialState = () => {
  if (sessionStorage.getItem("shoppingstate")) {
    let state = JSON.parse(sessionStorage.getItem("shoppingstate"));
    return state;
  } else {
    return {
      list: [],
      error: "",
    };
  }
};

const saveToStorage = (state) => {
  sessionStorage.setItem("shoppingstate", JSON.stringify(state));
};
const initialState = getInitialState();

const shoppingReducer = (state = initialState, action) => {
  console.log("ShoppingReducer, action:", action);
  let tempState = {};
  switch (action.type) {
    case FETCH_LIST_SUCCESS:
      tempState = {
        list: action.list,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;

    case FETCH_LIST_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case ADD_ITEM_SUCCESS:
      tempState = {
        ...state,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;

    case ADD_ITEM_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case REMOVE_ITEM_SUCCESS:
      tempState = {
        ...state,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;

    case REMOVE_ITEM_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case EDIT_ITEM_SUCCESS:
      tempState = {
        ...state,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;

    case EDIT_ITEM_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case CLEAR_SHOPPING_STATE:
      tempState = {
        list: [],
        error: "",
      };
      saveToStorage(tempState);
      return tempState;

    default:
      return state;
  }
};
export default shoppingReducer;
