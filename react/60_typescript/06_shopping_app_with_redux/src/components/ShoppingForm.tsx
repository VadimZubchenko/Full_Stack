import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	addItem(item:ShoppingItem):void
}

interface State {
	type:string;
	count:number;
	price:number;
}

const ShoppingForm:React.FC<Props> = (props:Props) => {
	
	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let item = new ShoppingItem(0,state.type,state.count,state.price);
		props.addItem(item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="type">Type</label>
			<input type="text"
					name="type"
					id="type"
					onChange={onChange}
					value={state.type}/>
			<br/>
			<label htmlFor="count">Count</label>
			<input type="number"
					name="count"
					id="count"
					onChange={onChange}
					value={state.count}/>
			<br/>
			<label htmlFor="price">Price</label>
			<input type="number"
					name="price"
					id="price"
					onChange={onChange}
					step="0.01"
					value={state.price}/>
			<br/>
			<input type="submit" value="Add"/>
		</form>
	)
	
} 

export default ShoppingForm;