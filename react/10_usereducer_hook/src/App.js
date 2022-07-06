import logo from "./logo.svg";
import { useReducer } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const initialState = {
  list: [],
  id: 100,
};

const listReducer = (state, action) => {
  let tempList = [];
  switch (action.type) {
    case "ADD_TO_LIST":
      action.contact.id = state.id;
      //The concat() method is used to merge two or more arrays.
      tempList = state.list.concat(action.contact);
      return {
        list: tempList,
        id: state.id + 1,
      };
    case "REMOVE_FROM_LIST":
      // The filter() method creates a new array with all elements
      // that pass the test implemented by the provided function.
      // here filter includes all contact beside id of deleted contact
      tempList = state.list.filter((contact) => contact.id == !action.id); //id from object of removeFromList action
      return {
        ...state,
        list: tempList,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);

  const addToList = (contact) => {
    dispatch({
      type: "ADD_TO_LIST",
      contact: contact,
    });
  };

  const removeFromList = (id) => {
    dispatch({
      type: "REMOVE_FROM_LIST",
      id: id,
    });
  };
  return (
    <div className="App">
      <ContactForm addContact={addToList} />
      <hr />
      <ContactList list={state.list} removeFromList={removeFromList} />
    </div>
  );
}

export default App;
