import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  loginHandle = e => {
    console.log(this.props);
    console.log(e);

    e.preventDefault();
    const logindetails = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    console.log(this.props);

    this.setState({ isLoggedIn: true });

    console.log(logindetails);
    axios
      .get("http://localhost:3000/users/login", {
        params: {
          username: e.target.username.value,
          password: e.target.password.value
        }
      })
      .then(res => {
        console.log(logindetails);
        this.props.dispatch({ type: "USER", payload: res.data });
        // this.setState({
        //   user: res.data
        // });

        if (typeof Storage !== "undefined") {
          sessionStorage.setItem("token", res.data.token);
        } else {
          console.log("error");
        }
        return this.state;
      });
  };

  render() {
    if (this.state.isLoggedIn === true) {
      console.log(this.state.user);

      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        ></Redirect>
      );
    }

    return (
      <div className="container">
        <form action="/users/login" onSubmit={this.loginHandle}>
          <div className="form-group">
            <label for="username">User Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="User Name"
              required
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
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
)(Login);
