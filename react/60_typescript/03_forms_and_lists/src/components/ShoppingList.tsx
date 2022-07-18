import React from "react";
import ShoppingItem from "../models/ShoppingItem";

interface Props{
  list: ShoppingItem[];
  removeItem: (id:number) => void;
}

const ShoppingList:React.FC<Props> = (props:Props) => {

  let items = props.list.map((item)=>{
    return (
      <tr key= {item.id}>
        <td>{item.type}</td>
        <td>{item.count}</td>
        <td>{item.price}</td>
        <td><button onClick={() => props.removeItem(item.id)}>Remove</button></td>
      </tr>
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
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  )
}
export default ShoppingList;