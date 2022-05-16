const Label = (props) => {
  const labelStyle = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    padding: 13,
    margin: 0,
  };
  return (
    <p style={labelStyle} onClick={props.onColorChange}>
      {props.color}
    </p>
  );
};
export default Label;
