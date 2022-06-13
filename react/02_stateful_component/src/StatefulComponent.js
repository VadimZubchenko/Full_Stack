import React from "react";

class StatefulComponent extends React.Component {
  // CREATE the STATE!
  // Constructor! State can be only set here directly!
  // Super can be just in inside of constuctor
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      timerId: 0,
    };
  }
  // STATE UPDATING!
  // NOTE: state updates can be async, So if we refer to the old state or props inside
  // setState function, we need to make the value change also a function (setState(state))
  // so that the updates can be chained together.
  startTimer = () => {
    console.log("State update");
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  };

  // START OF STATE UPDATING !
  // Called to determine whether the change in props and state should trigger a re-render.
  // ComponentDidMount(). Called immediately after first successful render (ie.mounting)
  // with interval 1000 msec (1 s.)
  componentDidMount() {
    // setInterval() is builded function within Node.js
    // The `timer` module exposes a global API for scheduling functions to
    let interval = setInterval(() => this.startTimer(), 1000);
    this.setState({
      timerId: interval,
    });
  }

  // FINISH STATE UPDATE
  // componentWillUnmount. Called when the component is unmmounted.
  // In this case when we leave the page. We clear the interval.

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render() {
    return (
      <h2>It has been {this.state.seconds} since you arrived to the page</h2>
    );
  }
}
export default StatefulComponent;
