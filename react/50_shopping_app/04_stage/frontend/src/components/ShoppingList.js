import Row from "./Row";
import RemoveRow from "./RemoveRow";
import EditRow from "./EditRow";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, edit } from "../actions/shoppingActions";

const ShoppingList = (props) => {
  // before cancel we need remove old one
  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1,
  });

  const dispatch = useDispatch();

  const appState = useSelector((state) => {
    return {
      token: state.login.token,
      list: state.shopping.list,
    };
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
    dispatch(removeItem(appState.token, id));
    cancel();
  };
  const editItem = (item) => {
    dispatch(edit(appState.token, item));
    cancel();
  };

  let items = appState.list.map((item, index) => {
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
