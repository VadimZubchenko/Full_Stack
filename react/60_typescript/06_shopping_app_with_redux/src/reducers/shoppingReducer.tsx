import * as ActionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';
import {ShoppingState} from '../types/states';
import {AnyAction,Reducer} from 'redux';

const getInitialState = ():ShoppingState => {
	let state = sessionStorage.getItem("shoppingstate");
	if(state) {
		return JSON.parse(state)
	} else {
		return {
			list:[],
			error:""
		}
	}
}

const saveToStorage = (state:ShoppingState) => {
	sessionStorage.setItem("shoppingstate",JSON.stringify(state));
}

const initialState:ShoppingState = getInitialState();

const shoppingReducer:Reducer<ShoppingState,AnyAction> = (state:ShoppingState = initialState,action:AnyAction):ShoppingState => {
	let tempState:ShoppingState = {
		list:[],
		error:""
	}
	switch(action.type) {
		case ActionConstants.LOADING:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.FETCH_LIST_SUCCESS:
			tempState = {
				...state,
				list:action.list
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.FETCH_LIST_FAILED:
		case ActionConstants.ADD_ITEM_FAILED:
		case ActionConstants.REMOVE_ITEM_FAILED:
		case ActionConstants.EDIT_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case ActionConstants.ADD_ITEM_SUCCESS:
		case ActionConstants.REMOVE_ITEM_SUCCESS:
		case ActionConstants.EDIT_ITEM_SUCCESS:
			return state;
		case ActionConstants.CLEAR_SHOPPING_STATE:
			tempState = {
				list:[],
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default shoppingReducer;