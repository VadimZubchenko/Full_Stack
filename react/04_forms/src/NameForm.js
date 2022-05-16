import { useState } from "react";
// creat a form, where input value changes by state (state.firstname)
// when user writes a name, this goes and save to form's state(store)
const NameForm = (props) => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
  });
  // this is for writing text into input
  const onChange = (event) => {
    setState((state) => {
      return {
        // ... выражение объекта, которое будет расширяться в любом месте.
        ...state,
        // this uses name of input, (not a id)
        [event.target.name]: event.target.value,
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
  // create two function for subimiting and for wrigthing value
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        onChange={onChange}
        value={state.firstname}
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
