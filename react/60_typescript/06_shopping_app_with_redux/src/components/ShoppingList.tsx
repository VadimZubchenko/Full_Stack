import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {remove, edit} from '../actions/shoppingActions';

interface ListState {
	login:{
		token:string
	},
	shopping:{
		list:ShoppingItem[]
	}
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})

	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();

	const stateFunc = (state:ListState) => state;

	const appState = useSelector(stateFunc);

	const handleButtons = (index:number,which:string) => {
		if(which === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		} else {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
	}
	
	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const removeItem = (id:number | string) => {
		dispatch(remove(appState.login.token,id));
		cancel();
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(appState.login.token,item));
		cancel();
	}
	
	let items = appState.shopping.list.map((item,index) => {
    if(state.removeIndex === index){
      return (
        <RemoveRow key={item.id} item={item} removeItem={removeItem} cancel={cancel}/>
      )
    }
    if(state.editIndex === index){
      return (
        <EditRow key={item.id} item={item} editItem={editItem} cancel={cancel}/>
      )
    }
		return(
			<Row key={item.id} item={item} index={index} handleButtons={handleButtons}/>
		)
	}) 
	return(
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>	
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
		
		)
}

export default ShoppingList;