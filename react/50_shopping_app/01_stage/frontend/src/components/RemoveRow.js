const RemoveRow = (props) => {
  return (
    <tr>
      <td>{props.item.type}</td>
      <td>{props.item.count}</td>
      <td>{props.item.price}</td>
      <td>
        <button className="btn btn-danger" onClick={() => props.cancel()}>
          Cancel
        </button>
      </td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => props.removeFromList(props.time.id)}
        >
          Confirm
        </button>
      </td>
    </tr>
  );
};
export default RemoveRow;
