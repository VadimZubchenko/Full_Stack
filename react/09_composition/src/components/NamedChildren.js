const NamedChildren = (props) => {
  let cardStyle = {
    backgroundColor: "lightgreen",
    height: 200,
    width: 200,
    textAlign: "center",
    margin: 10,
  };
  const { header, media, content } = props;
  return (
    <div style={cardStyle}>
      <div>{header}</div>
      {media ? <div>{media}</div> : <></>}
      <div>{content}</div>
    </div>
  );
};
