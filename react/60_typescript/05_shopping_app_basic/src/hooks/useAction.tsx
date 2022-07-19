import React,{useReducer,useEffect,useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface AppState {
	list:ShoppingItem[];
	loading:boolean;
}

interface FetchState {
	request:Request
}
// initialState on AppState tyypellä, jonka objekti on tyhjä alussa
const initialState:AppState = {
	list:[],
	loading:false
}

type Action = {
	type:string,
	payload:any
}

const listReducer = (state:AppState,action:Action) => {
	switch(action.type) {
		case "LOADING":
			return {
				...state,
				loading:true
			}
		case "STOP_LOADING":
			return {
				...state,
				loading:false
			}
		case "FETCH_LIST_DONE":
			return {
				...state,
				list:action.payload as ShoppingItem[]
			}
		default:
			return state;
	}
}
// (): [....type...] näin asennetaan typpeja jokaiseen arraylistan elementiin in App.tsx
export const useAction = ():[ShoppingItem[],boolean,() => void, (item:ShoppingItem) => void, (id:number | string) => void, (item:ShoppingItem) => void] => {
	
	const [urlRequest,setUrlRequest] = useState<FetchState>({
		request:new Request("",{})
	})
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	useEffect(() => {
		if(!urlRequest.request) {
			return;
		}
		
		const fetchData = async () => {
			dispatch({type:"LOADING",payload:{}});
			const response = await fetch(urlRequest.request);
			dispatch({type:"STOP_LOADING",payload:{}});
			if(!response) {
				return;
			}
			if(response.ok) {
				if(urlRequest.request.method === "GET") {
					const data = await response.json();
					dispatch({type:"FETCH_LIST_DONE",payload:data})
				} else {
					getList();
				}
			} else {
				console.log("Server responded with a status:"+response.status);
			}
			
			
		}
		fetchData();
	},[urlRequest.request])
	
	const getList = () => {
		let tempRequest = new Request("/api/shopping",{
			method:"GET",
			headers:{"Content-type":"application/json"}
		})
		setUrlRequest({
			request:tempRequest
		})
	}


	const addItem = (item:ShoppingItem) => {
		let tempRequest = new Request("/api/shopping",{
			method:"POST",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		})
		setUrlRequest({
			request:tempRequest
		})
	}

	const removeItem = (id: number | string) => {
		let tempRequest = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:{"Content-type":"application/json"}
		})
		setUrlRequest({
			request:tempRequest
		})
	}	

	const editItem = (item:ShoppingItem) => {
		let tempRequest = new Request("/api/shopping/"+item.id,{
			method:"PUT",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		})
		setUrlRequest({
			request:tempRequest
		})
	}
	
	return [state.list,state.loading,getList,addItem,removeItem,editItem];
}