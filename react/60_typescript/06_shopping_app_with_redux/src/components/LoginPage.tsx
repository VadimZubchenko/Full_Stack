import React, {useState} from "react";
import User from '../models/User';

interface State {
  username: string;
  password: string;
}

const LoginPage:React.FC<{}> = (props) => {

  const [state, setState] = useState<State>({
    username:"", 
    password:""
  })

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setState((state) =>{
      return {
        ...state,
        [e.target.name]:e.target.value 
      }
    })
  }
  const onRegister = (e:React.SyntheticEvent) =>{
    e.preventDefault();
    let user = new User(state.username,state.password);
    // TODO: userDispatch to register user
  }

  const onLogin = (e:React.SyntheticEvent) => {
    e.preventDefault();
    let user = new User(state.username, state.password);
    // TODO: userDispatch to register user
  }

  return(
    <form>
      <label htmlFor="username">Username</label>
      <input type="text"
      name="username"
      id="username"
      onChange={onChange}
      value={state.username}/>
      <br/>
      <label htmlFor="password">Password</label>
      <input type="password"
      name="password"
      id="password"
      onChange={onChange}
      value={state.password}/>
      <br/>
      <button onClick={onRegister}>Register</button>
      <button onClick={onLogin}>Login</button>


    </form>
  )
}
export default LoginPage;