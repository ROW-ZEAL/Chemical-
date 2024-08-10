import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class AddMember extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { responseStatus: "none" };
  }

  handleSubmit(event) {
    event.preventDefault();
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
        if (responseData.status === "success") {
          event.target.reset();
          this.setState({ responseStatus: "success" });
        } else {
          this.setState({ responseStatus: "fail" });
        }
      });
  }

  render() {
    return (
      <div>
        <div className="container mt-6">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4 text-center">Add Member</h4>
                  {this.state.responseStatus === "success" ? (
                    <div className="alert alert-success" role="alert">
                      Member added successfully!
                    </div>
                  ) : (
                    this.state.responseStatus === "fail" && (
                      <div className="alert alert-danger" role="alert">
                        Failed to add member. Please try again.
                      </div>
                    )
                  )}
                  <form onSubmit={this.handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          name="first_name"
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          name="last_name"
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Number</label>
                        <input
                          name="number"
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <select className="form-select" name="gender" required>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMember;
