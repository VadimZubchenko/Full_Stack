import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  // just App takes care of ID, not form!
  const [state, setState] = useState({
    list: [],
    id: 100,
  });
  const addContact = (contact) => {
    contact.id = state.id;
    setState((state) => {
      return {
        // contact return complite a new array
        list: state.list.concat(contact),
      };
    });
  };
  const removeFromList = (id) => {
    setState((state) => {
      let templist = state.list.filter((contact) => contact.id !== id);
      return {
        ...state,
        list: templist,
      };
    });
  };

  return (
    <div className="App">
      <ContactForm addContact={addContact} />
      <hr />
      <ContactList list={state.list} removeFromList={removeFromList} />
    </div>
  );
}

export default App;
