// this is function-based  component, without render()
// it's workflow happens inside of render() in index.js
const HelloFunc = (props) => {
  let name = "Function-based component";
  if (props.name) {
    name = props.name;
  }
  return <h1>Hello {name} </h1>;
};
export default HelloFunc;
