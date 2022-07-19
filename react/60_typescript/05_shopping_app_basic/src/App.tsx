import React from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import {useAction} from './hooks/useAction';

function App() {

  const [list, loading, getList, addItem, removeItem, editItem] = useAction();

  let header = <h2>Shopping App</h2>
  if(loading){
    header = <h2>Loading ...</h2>
  }

  return (
    <div className="App">
      {header}
      <ShoppingForm addItem={addItem}/>
      <hr/>
      <ShoppingList list={list} removeItem={removeItem} editItem={editItem}/>
    </div>
  );
}

export default App;
