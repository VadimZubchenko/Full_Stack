import ShoppingItem from "../models/ShoppingItem";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import * as ActionConstants from '../types/actionConstants';


export const getList = (token:string) => {
  return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
    const request:Request = new Request("/api/shopping",{
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json",
      token:token}
    })
    handleFetch(request,"getlist",dispatch, ""); 
  }
}

export const add = (token:string, item:ShoppingItem) =>{
  return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
    const request:Request = new Request("/api/shopping",{
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json",
      token:token},
      body:JSON.stringify(item)
    })
    handleFetch(request,"additem",dispatch, token); 
  }
}

export const remove = (token:string,id:number | string ) =>{
  return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
    const request:Request = new Request("/api/shopping/"+id,{
      method:"DELETE",
      mode:"cors",
      headers:{"Content-type":"application/json",
      token:token}
    })
    handleFetch(request,"removeitem",dispatch,token); 
  }
}

export const edit = (token:string,item:ShoppingItem) =>{
  return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
    const request:Request = new Request("/api/shopping/"+item.id,{
      method:"PUT",
      mode:"cors",
      headers:{"Content-type":"application/json",
      token:token},
      body:JSON.stringify(item)
    })
    handleFetch(request,"edititem",dispatch, token); 
  }
}

const handleFetch = async (request:Request,act:string, dispatch:ThunkDispatch<any,any,AnyAction>,token:string) => {
  dispatch({
    type:ActionConstants.LOADING
  })
  const response = await fetch(request);
  dispatch({
    type:ActionConstants.STOP_LOADING
  })
  if(!response) {
		console.log("Failed to get response");
		return;
  }
  if(response.ok){
    if(act === "getlist"){
      const data = await response.json();
      if(!data){
        dispatch({
          type:ActionConstants.FETCH_LIST_FAILED,
          error:"Failed to parse shopping information"
        })
        return;
      }
      let list = data as ShoppingItem[];
      dispatch({
        type:ActionConstants.FETCH_LIST_SUCCESS,
        list:list
      })
    }

    if(act === "additem"){
      dispatch({
        type:ActionConstants.ADD_ITEM_SUCCESS
      })
      dispatch(getList(token));
    }
    if(act === "removeitem"){
      dispatch({
        type:ActionConstants.REMOVE_ITEM_SUCCESS
      })
      dispatch(getList(token));
    }
    if(act === "edititem"){
      dispatch({
        type:ActionConstants.EDIT_ITEM_SUCCESS
      })
      dispatch(getList(token));
    }

  } else {
    let error = "Server responded with a status:"+response.status;
    
    if(response.status === 403) {
      dispatch({
        type:ActionConstants.CLEAR_LOGIN_STATE,
      })
      dispatch({
        type:ActionConstants.CLEAR_SHOPPING_STATE,
      })
      error = "Session has expired. Logging you out!";
    }
  
    if(act === "getlist"){
      dispatch({
        type:ActionConstants.FETCH_LIST_FAILED,
        error:error
      })
    }
    if(act === "additem"){
      dispatch({
        type:ActionConstants.ADD_ITEM_FAILED,
        error:error
      })
    }
    if(act === "removeitem"){
      dispatch({
        type:ActionConstants.REMOVE_ITEM_FAILED,
        error:error
      })
    }
    if(act === "edititem"){
      dispatch({
        type:ActionConstants.EDIT_ITEM_FAILED,
        error:error
      })
    }
  }
}

