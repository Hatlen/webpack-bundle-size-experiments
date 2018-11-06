import React, { Component } from "react";
import ReactDOM from "react-dom";

class A extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({ count: state.count + 1 }));
  }

  render() {
    <button onClick={this.handleClick}>{this.state.count}</button>;
  }
}

ReactDOM.render(document.querySelector("body"), <A />);
