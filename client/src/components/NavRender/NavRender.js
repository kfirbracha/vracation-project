import React, { Component } from "react";
import { connect } from "react-redux";
import { allVacations } from "../../store/actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "../Home";
import Login from "../Login";
import Add from "../Add";
import Register from "../Register";
import Charts from "../Charts";
import LogOut from "../LogOut";
import Edit from "../Edit";
class NavRender extends Component {
  componentWillMount() {
    console.log("will" + this.props.all);
  }
  componentDidMount() {
    console.log("did" + this.props);
  }
  render() {
    console.log(this.props);

    if (
      this.props.all.user === undefined ||
      this.props.all.user.userToSend === undefined ||
      this.props.all.user.userToSend.role === undefined
    ) {
      return (
        <div>
          <Router>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <Link className="navbar-brand" to="/">
                kfirTours
              </Link>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/Charts" exact component={Charts} />
              <Route path="/add" exact component={Add} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/edit/:id" exact component={Edit}></Route>
            </div>
          </Router>
        </div>
      );
    } else if (this.props.all.user.userToSend.role === 1) {
      return (
        <div>
          <Router>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <Link className="navbar-brand" to="/">
                kfirTours
              </Link>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/add" className="nav-link">
                    Add
                  </Link>
                </li>
                <li className="nav-item d-none">
                  <Link to="/Charts" className="nav-link">
                    Charts
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <Link to="/logout" className="nav-link">
                    logout
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/Charts" exact component={Charts} />
              <Route path="/add" exact component={Add} />
              <Route path="/logout" exact component={LogOut}></Route>
              <Route path="/edit/:id" exact component={Edit}></Route>
            </div>
          </Router>
        </div>
      );
    } else if (this.props.all.user.location.user.user.userToSend.role === 2) {
      return (
        <div>
          <Router>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <Link className="navbar-brand" to="/">
                kfirTours
              </Link>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <Link to="/logout" className="nav-link">
                    logout
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <Route
                path="/"
                exact
                component={Home}
                user={this.props.all.user.location.user.user}
              />
              <Route path="/Charts" exact component={Charts} />
              <Route path="/add" exact component={Add} />
              <Route path="/logout" exact component={LogOut}></Route>
              <Route path="/edit/:id" exact component={Edit}></Route>
            </div>
          </Router>
        </div>
      );
    }
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
  allVacations,
  mergeProps
)(NavRender);
