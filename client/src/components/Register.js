import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  constructor() {
    super();
    this.state = {};
  }

  registerHandle = e => {
    e.preventDefault();
    const logindetails = {
      username: e.target.username.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      password: e.target.password.value
    };
    console.log(logindetails);
    axios
      .post("http://localhost:3000/users/register", {
        data: {
          username: e.target.username.value,
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          password: e.target.password.value
        }
      })
      .then(res => {
        console.log(res.data);
        if (res.data != {}) {
          alert("error");
        } else {
          this.setState({
            isLoggedIn: res.data.isAdmin,
            role: res.data.role
          });
          console.log(this.state);
        }
      });
  };

  render() {
    return (
      <div className="container">
        <form action="/users/login" onSubmit={this.registerHandle}>
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
            <label for="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
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

export default Register;
