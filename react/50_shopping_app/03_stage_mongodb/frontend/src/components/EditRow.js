import { useState } from "react";

const EditRow = (props) => {
  const [state, setState] = useState({
    type: props.item.type,
    count: props.item.count,
    price: props.item.price,
  });

  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const editItem = (event) => {
    event.preventDefault();
    let item = {
      ...state,
      id: props.item.id,
    };
    props.editItem(item);
  };
  return (
    <tr>
      <td>
        <input
          type="text"
          name="type"
          id="type"
          onChange={onChange}
          value={state.type}
        />
      </td>
      <td>
        <input
          type="number"
          name="count"
          id="count"
          onChange={onChange}
          value={state.count}
        />
      </td>
      <td>
        <input
          type="number"
          name="price"
          id="price"
          step="0.1"
          onChange={onChange}
          value={state.price}
        />
      </td>
      <td>
        <button className="btn btn-success" onClick={editItem}>
          Save
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => props.cancel()}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditRow;
