import { useState } from "react";
const ShoppingForm = (props) => {
  const [state, setState] = useState({
    type: "",
    count: 0,
    price: 0,
  });

  // All form include two basic function:
  // onChange() fetch new value ([name]: value) from input-element and move them into state using setState()
  // onSubmit(), where just props.addShopItem(item) will be changed. Form itself doesn’t change.

  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value, //target.value - gets data from input-elem
      };
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    let item = {
      ...state,
    };
    // send inputed item data to parent-component App.js's method addShoppinglist()
    props.addShoppingItem(item);
    // after sending, put item state to empty state
    setState({
      type: "",
      count: 0,
      price: 0,
    });
  };
  return (
    <div style={{ width: 500, backgroundColor: "lightgreen", margin: "auto" }}>
      <form onSubmit={onSubmit} className="mb-3">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          type="text"
          name="type"
          id="type"
          className="form-control"
          onChange={onChange}
          value={state.type}
        />
        <label htmlFor="count" className="form-label">
          Count
        </label>
        <input
          type="number"
          name="count"
          id="count"
          className="form-control"
          onChange={onChange}
          value={state.count}
        />
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          step="0.01"
          className="form-control"
          onChange={onChange}
          value={state.price}
        />
        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
    </div>
  );
};
export default ShoppingForm;
