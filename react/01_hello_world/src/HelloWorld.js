// this is class-based component must have render()
import React from "react";

class HelloWorld extends React.Component {
  // all classes must have a render() method!
  render() {
    let name = "Class-based component";
    if (this.props.name) {
      name = this.props.name;
    }
    return <h1>Hello {name} </h1>;
  }
}
export default HelloWorld;
