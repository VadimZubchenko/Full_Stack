//Action types as constants

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

//ASync action creators

export const register = (user) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    };
    dispatch(loading());
    let response = await fetch("/register", request);
    if (!response) {
      dispatch(
        registerFailed(
          "There was an error with the connetion. Register failed!"
        )
      );
      return;
    }
    if (response.ok) {
      dispatch(registerSuccess());
    } else {
      if (response.status === 409) {
        dispatch(registerFailed("Username already in use"));
      } else {
        dispatch(
          registerFailed(
            "Register failed. Server responded with a status " + response.status
          )
        );
      }
    }
  };
};

//Action creators

export const loading = () => {
  return {
    type: LOADING,
  };
};
export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    error: error,
  };
};
