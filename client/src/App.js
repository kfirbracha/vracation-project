import React, { Component } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { allVacations } from "./store/actions";
class App extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};
const mapStateToPrps = state => {
  console.log(state);

  return {
    all: state
  };
};

export default connect(
  mapStateToPrps,
  null,
  mergeProps
)(App);
