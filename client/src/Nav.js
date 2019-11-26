import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { allVacations } from "./store/actions";
import NavRender from "./components/NavRender/NavRender";
class Nav extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <NavRender />
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
  allVacations,
  mergeProps
)(Nav);
