import Row from "./Row";
import RemoveRow from "./RemoveRow";
import EditRow from "./EditRow";
import { useState } from "react";
import useAction from "../hooks/useAction";
import useAppState from "../hooks/useAppState";

const ShoppingList = (props) => {
  const { list } = useAppState();
  const { remove, edit } = useAction();

  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1,
  });

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
    remove(id);
    cancel();
  };

  const editItem = (item) => {
    edit(item);
    cancel();
  };

  let items = list.map((item, index) => {
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
    return (
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
      <tbody>{items}</tbody>
    </table>
  );
};

export default ShoppingList;
