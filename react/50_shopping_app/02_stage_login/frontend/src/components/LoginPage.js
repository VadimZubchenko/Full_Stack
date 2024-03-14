import { useState } from "react";
// Controlled components (form handling)
const LoginPage = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  //define method 'onChange' as a property, that is equal as an arrow function,
  //where 'event' is passed as a parameter
  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (state.username.length < 4 || state.password.length < 8) {
      props.setError(
        "Username needs to be at least four and password eight characters long"
      );
      return;
    }
    // create object user from values of state
    let user = {
      username: state.username,
      password: state.password,
    };
    if (event.target.name === "register") {
      props.register(user);
    } else {
      props.login(user);
    }
  };
  //this is just for changing in return() the state.username and state.password to username and password.
  const { username, password } = state;
  return (
    <div style={{ width: 500, backgroundColor: "lightgreen", margin: "auto" }}>
      <form className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          onChange={onChange}
          value={username}
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          onChange={onChange}
          value={password}
        />
        <button className="btn btn-primary" name="register" onClick={onSubmit}>
          Register
        </button>
        <button
          className="btn btn-primary"
          name="login"
          onClick={onSubmit}
          style={{ marginLeft: 10 }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
