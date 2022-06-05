import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOADING,
  STOP_LOADING,
  CLEAR_LOGIN_STATE,
} from "../actions/loginActions";

/*
login state 
isLogged:boolean,
loading:boolean,
token:string,
error:string
*/

const getInitialState = () => {
  if (sessionStorage.getItem("loginstate")) {
    let state = JSON.parse(sessionStorage.getItem("loginstate"));
    return state;
  } else {
    return {
      isLogged: false,
      loading: false,
      token: "",
      error: "",
    };
  }
};

const saveToStorage = (state) => {
  sessionStorage.setItem("loginstate", JSON.stringify(state));
};
const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
  console.log("loginReducer, action:", action);
  let tempState = {};
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    case REGISTER_SUCCESS:
      tempState = {
        ...state,
        loading: false,
        error: "Register success!",
      };
      saveToStorage(tempState);
      return tempState;

    case REGISTER_FAILED:
      tempState = {
        ...state,
        loading: false,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case LOGIN_SUCCESS:
      tempState = {
        isLogged: true,
        token: action.token,
        loading: false,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;
    case LOGIN_FAILED:
      tempState = {
        ...state,
        loading: false,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case LOGOUT_SUCCESS:
      tempState = {
        isLogged: false,
        token: "",
        loading: false,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;

    case LOGOUT_FAILED:
      tempState = {
        isLogged: false,
        token: "",
        loading: false,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;

    case CLEAR_LOGIN_STATE:
      tempState = {
        isLogged: false,
        token: "",
        loading: false,
        error: "",
      };
      saveToStorage(tempState);
      return tempState;
    default:
      return state;
  }
};
export default loginReducer;
