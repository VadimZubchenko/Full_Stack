import React, {useState} from "react";
import User from '../models/User';
import {register, login} from '../actions/loginActions';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

interface State {
  username: string;
  password: string;
}

const LoginPage:React.FC<{}> = (props) => {

  const [state, setState] = useState<State>({
    username:"", 
    password:""
  })

  const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();

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
    dispatch(register(user));
  }

  const onLogin = (e:React.SyntheticEvent) => {
    e.preventDefault();
    let user = new User(state.username, state.password);
    dispatch(login(user));
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