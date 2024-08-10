import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const IndividualContribution = () => {
  const [individualContribution, setIndividualContribution] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/indivi")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.individual_summary);
        setIndividualContribution(data.individual_summary);
      })
      .catch((error) => console.error(error));
  }, []);

  let sn = 1;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title mb-4">Individual Contribution</h1>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>SN</th>
                      <th>Member Id</th>
                      <th>First Name</th>
                      <th>Total Amount</th>
                      <th>Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {individualContribution.map((individual) => (
                      <tr key={individual.member_id}>
                        <td>{sn++}</td>
                        <td>{individual.member_id}</td>
                        <td>
                          <Link
                            to={`/Individual_summary/${individual.first_name}`}
                            className="text-decoration-none text-primary"
                          >
                            {individual.first_name}
                          </Link>
                        </td>
                        <td>{individual.total_amount}</td>
                        <td>{individual.number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualContribution;
