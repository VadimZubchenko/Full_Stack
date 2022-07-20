import * as ActionConstants from '../types/actionConstants';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import User from '../models/User';

interface Token {
	token:string
}

export const register = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/register",{
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		})
		handleLogin(request,"register",dispatch);
	}
}

export const login = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/login",{
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		})
		handleLogin(request,"login",dispatch);
	}	
}

export const logout = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/logout",{
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token}
		})
		handleLogin(request,"logout",dispatch);
	}
}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {
	dispatch({
		type:ActionConstants.LOADING
	})
	const response = await fetch(request);
	dispatch({
		type:ActionConstants.STOP_LOADING
	})
	if(!response) {
		console.log("Failed to connect to server");
		return;
	}
	if(response.ok) {
		if(act === "register") {
			dispatch({
				type:ActionConstants.REGISTER_SUCCESS
			})
		}
		if(act === "login") {
			const temp = await response.json();
			if(!temp) {
				dispatch({
					type:ActionConstants.LOGIN_FAILED,
					error:"Failed to parse login information"
				})
				return;
			}
			let data = temp as Token;
			dispatch({
				type:ActionConstants.LOGIN_SUCCESS,
				token:data.token
			})
		}
		if(act === "logout") {
			dispatch({
				type:ActionConstants.LOGOUT_SUCCESS
			})
			dispatch({
				type:ActionConstants.CLEAR_SHOPPING_STATE
			})
		}
	} else {
		let error:string = "Server responded with a status:"+response.status
		if(act === "register") {
			if(response.status === 409) {
				error = "Username already in use"
			}
			dispatch({
				type:ActionConstants.REGISTER_FAILED,
				error:error
			})
		}
		if(act === "login") {
			dispatch({
				type:ActionConstants.LOGIN_FAILED,
				error:error
			})
		}
		if(act === "logout") {
			dispatch({
				type:ActionConstants.LOGOUT_FAILED,
				error:error
			})
			dispatch({
				type:ActionConstants.CLEAR_SHOPPING_STATE
			})
		}
	}
}