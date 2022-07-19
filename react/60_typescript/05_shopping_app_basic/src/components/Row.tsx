import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	index:number;
	handleButtons:(index:number,which:string) => void;
}

const Row:React.FC<Props> = (props:Props) => {
		return (
			<tr>
				<td>{props.item.type}</td>
				<td>{props.item.count}</td>
				<td>{props.item.price}</td>
				<td><button onClick={() => props.handleButtons(props.index,"remove")}>Remove</button></td>
				<td><button onClick={() => props.handleButtons(props.index,"edit")}>Edit</button></td>
			</tr>
			
		)	
}

export default Row;