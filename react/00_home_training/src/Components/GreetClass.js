import React, { Component } from "react";

class GreetClass extends Component {
  state = {};
  render() {
    return <h2>Class Comp greetings {this.props.name}!</h2>;
  }
}

export default GreetClass;
