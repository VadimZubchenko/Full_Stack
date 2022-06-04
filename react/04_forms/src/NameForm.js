import { useState } from "react";
// creat a form, where input value changes by state (state.firstname)
// when user writes a name, this goes and save to form's state(store)
const NameForm = (props) => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
  });
  // async button functiont, it triggers for writing text into inputi
  // it will be call two times for name and surname seppartely
  // where values goes to state via setState
  const onChange = (event) => {
    // To access the fields in the event handler use
    // the event.target.name and event.target.value.(not a id)
    const name = event.target.name;
    const value = event.target.value;
    // setting new props into state
    setState((state) => {
      return {
        // ... helps to rewrite all values of useState's array list.
        ...state,
        // to update the state, use square brackets
        // [bracket notation] around the property name.
        [name]: value,
      };
    });
  };

  const onSubmit = (event) => {
    // 'preventDefault' prevents from loading koko html-sivua.
    // but we neen to load just data inside of form.
    event.preventDefault();
    let name = state.firstname + " " + state.lastname;
    //it gives 'name' to the app.js via props
    props.setGreeting(name);
  };
  // create two function for wrigthing(input, onChange, that change setState)
  // and for subimiting value (input submit)
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        value={state.firstname}
        onChange={onChange}
      />
      <br />
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        onChange={onChange}
        value={state.lastname}
      />
      <br />
      <input type="submit" value="Greet" />
    </form>
  );
};
export default NameForm;
