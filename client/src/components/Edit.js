import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
class Edit extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    console.log(this.props.match.params.id);
    let id = this.props.match.params.id;

    let auth = sessionStorage.getItem("token");
    let header = {
      authorization: auth
    };

    Axios.get(`http://localhost:3000/edit/${id}`, {
      headers: header
    }).then(res => {
      console.log(res.data);
      this.setState({ vacToEdit: res.data });
      console.log(this.state);
    });
  }
  render() {
    if (this.state.vacToEdit === undefined) {
      return "undef";
    } else {
      return (
        <div className="container" onSubmit={this.onSubmitHendle}>
          <form>
            <div className="form-group">
              <label htmlFor="description">description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                aria-describedby="discribe"
                value={this.state.vacToEdit.description}
              />
              <small id="describe" className="form-text text-muted">
                תאר את החופשה במדויק
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="destination">destination</label>
              <input
                type="text"
                className="form-control"
                id="destination"
                value={this.state.vacToEdit.destination}
              />
            </div>
            <div className="form-inline">
              <div className="form-froup mb-2">
                <label htmlFor="date_from">date from</label>
                <input
                  type="date"
                  className="form-control"
                  id="date_from"
                  value={this.state.vacToEdit.date_from}
                />
              </div>
              <div className="mx-sm-3 mb-2">
                <label htmlFor="date_to">date to</label>
                <input
                  type="date"
                  className="form-control"
                  id="date_to"
                  value={this.state.vacToEdit.date_to}
                />
              </div>
            </div>
            <div className="form-inline">
              <div className="form-group mb-3">
                <label htmlFor="price">Price: </label>
                <input
                  type="number"
                  min="0.00"
                  max="10000000.00"
                  step="0.01"
                  className="form-control"
                  id="price"
                  value={this.state.vacToEdit.price}
                />
              </div>
            </div>
            <div className="form-inline ">
              <div className="form-froup mx-sm-3 mb-2">
                {" "}
                <div className="custom-file">
                  {" "}
                  <label
                    className="custom-file-label"
                    htmlFor="img"
                    value={this.state.vacToEdit.image_path_name}
                  >
                    Image
                  </label>
                  <input type="file" id="img" className="form-control" />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
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
)(Edit);
