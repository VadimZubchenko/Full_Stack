import React, { Component } from "react";

class ClassState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Name",
      surname: "Surname",
    };
    this.exit = this.exit.bind(this);
  }
  //defined arrow function as a property of class
  changeUser = () => {
    this.setState({
      name: "Vadim",
      surname: "Zubchenko",
    });
  };
  //defined as a function, which is calling by arrow function in JSX
  exit() {
    this.setState({
      name: "See ",
      surname: "You",
    });
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.name} {this.state.surname}
        </h1>
        <button onClick={this.changeUser}>Enter</button>
        <br />
        <button onClick={this.exit}>Exit</button>
      </div>
    );
  }
}

export default ClassState;
