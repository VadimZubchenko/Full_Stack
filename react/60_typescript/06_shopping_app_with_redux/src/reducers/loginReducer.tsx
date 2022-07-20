import * as ActionConstants from '../types/actionConstants';
import {LoginState} from '../types/states';
import {AnyAction,Reducer} from 'redux';

const getInitialState = ():LoginState => {
	let state = sessionStorage.getItem("loginstate");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			loading:false,
			token:"",
			isLogged:false,
			error:""
		}
	}
}

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState:LoginState = getInitialState();

const loginReducer:Reducer<LoginState,AnyAction> = (state:LoginState = initialState,action:AnyAction):LoginState => {
	console.log("loginReducer:",action);
	let tempState:LoginState = {
		isLogged:false,
		token:"",
		loading:false,
		error:""
	}
	switch(action.type) {
		case ActionConstants.LOADING:
			return {
				...state,
				error:"",
				loading:true
			}
		case ActionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case ActionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"Register Success!"
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.REGISTER_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGIN_SUCCESS:
			tempState = {
				...state,
				token:action.token,
				isLogged:true,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGOUT_SUCCESS:
			tempState = {
				isLogged:false,
				token:"",
				error:"",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.LOGOUT_FAILED:
			tempState = {
				isLogged:false,
				token:"",
				error:action.error,
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.CLEAR_LOGIN_STATE:
			tempState = {
				isLogged:false,
				token:"",
				error:"",
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default loginReducer;