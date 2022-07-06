const ContactCard = (props) => {
  let cardStyle = {
    backgroundColor: "lightgreen",
    height: 200,
    width: 200,
    textAlign: "center",
    margin: 10,
  };
  return <div style={cardStyle}>{props.children}</div>;
};
export default ContactCard;
