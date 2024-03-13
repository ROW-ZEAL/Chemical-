import React, { useEffect, useState } from "react";

import NavBar from '../components/NavBar'



class AddMember extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { responseStatus: "none" };
  }

  handleSubmit(event) {
    event.preventDefault();
    let hasError = true;
    const data = new FormData(event.target);

    fetch("http://localhost:8000/api/add/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: data.get("first_name").trim(),
        last_name: data.get("last_name").trim(),
        number: data.get("number").trim(),
        email: data.get("email").trim(),
        address: data.get("address").trim(),
        gender: data.get("gender").trim(),
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData["status"] == "success") {
          event.target.reset();
          this.setState({ responseStatus: "success" });
        } else {
          this.setState({ responseStatus: "fail" });
        }
      });
  }

  render() {
    return (
      <div className="row">
        <NavBar/>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add SSPro</h4>
              {this.state.responseStatus == "success" ? (
                <div>Success</div>
              ) : (
                <></>
              )}
              <form className="form-sample" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        First name
                      </label>
                      <div className="col-sm-9">
                        <input
                          name="first_name"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Last name
                      </label>
                      <div className="col-sm-9">
                        <input
                          name="last_name"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                       Number
                      </label>
                      <div className="col-sm-9">
                        <input
                          name="number"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Email
                      </label>
                      <div className="col-sm-9">
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address
                      </label>
                      <div className="col-sm-9">
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Gender
                      </label>
                      <div className="col-sm-9">
                        <input
                          name="gender"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-gradient-primary me-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMember;