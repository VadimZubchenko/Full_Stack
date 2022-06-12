import Row from "./Row";
import RemoveRow from "./RemoveRow";
import { useState } from "react";
import EditRow from "./EditRow";

const ShoppingList = (props) => {
  // before canceling we need remove old one
  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1,
  });
  // when setState change state, then it triggers re-rendering
  const changeToRemoveMode = (index) => {
    setState({
      removeIndex: index,
      editIndex: -1,
    });
  };

  const changeToEditMode = (index) => {
    setState({
      removeIndex: -1,
      editIndex: index,
    });
  };

  const cancel = () => {
    setState({
      removeIndex: -1,
      editIndex: -1,
    });
  };
  const removeFromList = (id) => {
    props.removeFromList(id);
    cancel();
  };
  const editItem = (item) => {
    props.editItem(item);
    cancel();
  };
  // items get list from parent component App.js
  let items = props.list.map((item, index) => {
    if (state.editIndex === index) {
      return (
        <EditRow
          key={item.id}
          item={item}
          editItem={editItem}
          cancel={cancel}
        />
      );
    }
    if (state.removeIndex === index) {
      return (
        <RemoveRow
          key={item.id}
          item={item}
          cancel={cancel}
          removeFromList={removeFromList}
        />
      );
    }
    //pass here if state.index = -1 (no need any item neither edit or remove)
    // Keys help React identify which items have changed (added/removed/re-ordered).
    return (
      //'id' added into item[] array on server.js side
      <Row
        key={item.id}
        item={item}
        index={index}
        changeToRemoveMode={changeToRemoveMode}
        changeToEditMode={changeToEditMode}
      />
    );
  });
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
          <th>Price</th>
          <th>Remove</th>
          <th>Edit</th>
        </tr>
      </thead>
      {/*here we put items data into JSX*/}
      <tbody>{items}</tbody>
    </table>
  );
};
export default ShoppingList;
