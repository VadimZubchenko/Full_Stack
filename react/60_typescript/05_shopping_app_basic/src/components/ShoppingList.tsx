import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';

interface Props {
	list:ShoppingItem[];
	removeItem:(id:number | string) => void;
	editItem:(item:ShoppingItem) => void;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<Props> = (props:Props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
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
		props.removeItem(id);
		cancel();
	}
	
	const editItem = (item:ShoppingItem) => {
		props.editItem(item);
		cancel();
	}
	
	let items = props.list.map((item,index) => {
		return(
			<Row item={item} index={index} handleButtons={handleButtons}/>
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