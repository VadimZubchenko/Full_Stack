import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../actions/shoppingActions";

const ShoppingForm = (props) => {
  const [state, setState] = useState({
    type: "",
    count: 0,
    price: 0,
  });

  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    let item = {
      ...state,
    };
    dispatch(addItem(token, item));
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
