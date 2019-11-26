import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { allVacations } from "../store/actions";

class LogOut extends Component {
  constructor() {
    super();
    this.state = {
      logedIn: true
    };
  }

  logOutHandle = e => {
    sessionStorage.removeItem("token");
    this.setState({ logedIn: false });
    this.props.dispatch({ type: "USER", payload: "" });
    return this.state;
  };

  stayLoggedInHandle = e => {
    this.setState({ logedIn: "stay" });
    return this.state;
  };

  render() {
    if (this.props.all === undefined) {
      return "im undefiend";
    } else if (this.props.all !== undefined) {
      if (this.state.logedIn === false) {
        return <Redirect to={{ pathname: "/" }}></Redirect>;
      } else if (this.state.logedIn === "stay") {
        return (
          <Redirect
            to={{
              pathname: "/"
            }}
          ></Redirect>
        );
      }
    }
    return (
      <div class="jumbotron">
        <h1 class="display-4">
          Hello, {this.props.all.user.userToSend.first_name}
        </h1>
        <p class="lead">Are you sure you want to logout?</p>
        <hr class="my-4"></hr>

        <div class="container">
          <div className="row">
            <button
              class="btn btn-danger btn-lg"
              onClick={this.stayLoggedInHandle}
            >
              no
            </button>
            <button class="btn btn-primary btn-lg" onClick={this.logOutHandle}>
              yes
            </button>
          </div>
        </div>
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
    all: state.vacationReducers
  };
};
export default connect(
  mapStateToPrps,
  null,
  mergeProps
)(LogOut);
