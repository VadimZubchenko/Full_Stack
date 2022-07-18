import React, {useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingItem from './models/ShoppingItem';
import ShoppingList from './components/ShoppingList';


interface State {
  list:ShoppingItem[];
  id:number;
}

function App() {

  const [state, setState] = useState<State>({
    list:[],
    id:100
  })
  const addItem = (item:ShoppingItem) =>{
    item.id = state.id;
    setState((state) => {
      return {
        list:state.list.concat(item),
        id:state.id+1
      }
    })
  }
  const removeItem = (id:number) => {
    setState((state) => {
      let tempList = state.list.filter(item => item.id !== id);
      return {
        ...state,
        list:tempList
      }
    })
  }
  return (
    <div>
      <ShoppingForm addItem={addItem}/>
      <hr/>
      <ShoppingList list={state.list} removeItem={removeItem}/>
    </div>
  );
}

export default App;
