import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Add extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  onSubmitHendle = e => {
    e.preventDefault();
    console.log(e.target.date_from.value);

    console.log(e.target.img);
    var form = new FormData();
    form.append(e.target.img.files[0].name, e.target.img.files[0]);
    let description = e.target.description.value;
    let destination = e.target.destination.value;
    let date_from = e.target.date_from.value;
    let date_to = e.target.date_to.value;
    let price = e.target.price.value;
    let Image = e.target.img.files[0];
    form.append(
      "data",
      JSON.stringify({
        Image: Image,
        description: description,
        destination: destination,
        date_from: date_from,
        date_to: date_to,
        price: price
      })
    );

    let auth = sessionStorage.getItem("token");
    let header = {
      authorization: auth
    };
    axios
      .post("http://localhost:3000/add", form, { headers: header })
      .then(res => {
        console.log(res);
        this.setState({ toHome: true });
      });
    console.log(e.target.description.value);
  };
  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/"></Redirect>;
    }
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
              placeholder="description"
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
              placeholder="destination"
            />
          </div>
          <div className="form-inline">
            <div className="form-froup mb-2">
              <label htmlFor="date_from">date from</label>
              <input type="date" className="form-control" id="date_from" />
            </div>
            <div className="mx-sm-3 mb-2">
              <label htmlFor="date_to">date to</label>
              <input type="date" className="form-control" id="date_to" />
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
              />
            </div>
          </div>
          <div className="form-inline ">
            <div className="form-froup mx-sm-3 mb-2">
              {" "}
              <div className="custom-file">
                {" "}
                <label className="custom-file-label" htmlFor="img">
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

export default Add;
