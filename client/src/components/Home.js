import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Edit from "./Edit";
class Home extends Component {
  deleteVac = e => {
    let auth = sessionStorage.getItem("token");
    let header = {
      authorization: auth
    };
    let id = e.target.id;
    Axios.delete(`http://localhost:3000/delete/${id}`, {
      headers: header
    }).then(res => {
      console.log(res);
    });
    window.location.reload();
  };

  componentDidMount() {
    if (this.props.all.user !== undefined) {
      console.log(this.props.all);
    }
  }
  render() {
    console.log(this.props.all);

    // console.log(this.state.user);

    if (
      this.props.all.user === undefined ||
      this.props.all.user.userToSend === undefined ||
      this.props.all.user.userToSend.role === undefined
    ) {
      if (this.props.all.vacations === undefined) {
        return [];
      } else if (this.props.all.vacations !== undefined) {
        console.log(this.props.all.vacations);

        let allVacations = this.props.all.vacations.map(vacation => {
          return (
            <div
              key={`${vacation.id}`}
              className="card mr-2"
              style={{ width: "18rem" }}
            >
              <div className="custom-control custom-checkbox">
                <div className="form-check form-check-inline">
                  <div className="ml-5">followers :</div>
                </div>
              </div>
              <img
                src={`${vacation.image_path_name}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{vacation.destination}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {"FROM :" + vacation.date_from}
                  <br />
                  {" UNTIL :" + vacation.date_to}
                </h6>
                <p className="card-text">{vacation.description}</p>
                <hr />
                <p>Price : {vacation.price}</p>
              </div>
            </div>
          );
        });

        return (
          <div className="container">
            <div className="row"> {allVacations} </div>
          </div>
        );
      }
    } else if (this.props.all.user.userToSend.role === 1) {
      const allVacations = this.props.all.vacations.map(vacation => {
        return (
          <div
            key={`${vacation.id}`}
            className="card mr-2"
            style={{ width: "18rem" }}
          >
            <div className="custom-control custom-checkbox">
              <div className="form-check form-check-inline">
                <div className="ml-2">followers :</div>
                <Link to={`/edit/${vacation.id}`}>
                  {" "}
                  <FontAwesomeIcon
                    className="ml-5"
                    id={`e${vacation.id}`}
                    icon="edit"
                    onClick={() => {
                      return (
                        <Redirect
                          to={`/edit/${vacation.id}`}
                          exact
                          component={Edit}
                        ></Redirect>
                      );
                    }}
                  />
                </Link>
              </div>
            </div>
            <img
              src={`${vacation.image_path_name}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{vacation.destination}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {"FROM :" + vacation.date_from}
                <br />
                {" UNTIL :" + vacation.date_to}
              </h6>
              <p className="card-text">{vacation.description}</p>
              <hr />
              <p>Price : {vacation.price}</p>
            </div>
            <button
              className="btn btn-danger"
              id={vacation.id}
              onClick={this.deleteVac}
            >
              delete
            </button>
          </div>
        );
      });
      return (
        <div className="container">
          <div className="row"> {allVacations}</div>
        </div>
      );
    } else if (this.props.all.user.userToSend.role === 2) {
      let allVacations = this.props.all.vacations.map(vacation => {
        return (
          <div
            key={`${vacation.id}`}
            className="card mr-2"
            style={{ width: "18rem" }}
          >
            <div className="custom-control custom-checkbox">
              <div className="form-check form-check-inline">
                <div>
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`${vacation.id}`}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`${vacation.id}`}
                  >
                    Follow
                  </label>
                </div>

                <div className="ml-5">followers :</div>
              </div>
            </div>
            <img
              src={`${vacation.image_path_name}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{vacation.destination}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {"FROM :" + vacation.date_from}
                <br />
                {" UNTIL :" + vacation.date_to}
              </h6>
              <p className="card-text">{vacation.description}</p>
              <hr />
              <p>Price : {vacation.price}</p>
            </div>
          </div>
        );
      });
      return (
        <div className="container">
          <div className="row"> {allVacations}</div>
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
  null,
  mergeProps
)(Home);
