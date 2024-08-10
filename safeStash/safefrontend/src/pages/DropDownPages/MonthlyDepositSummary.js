import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

const MonthlyDepositSummary = () => {
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/monthly")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.monthly_summary);
        setMonthlySummary(data.monthly_summary);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (monthlySummary.length === 0) {
    return (
      <div className="container mt-5 text-center">
        No monthly summaries available.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Monthly Summary List</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">SN</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {monthlySummary.map((summary, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{summary.total_amount}</td>
                <td>{format(new Date(summary.month), "dd/MM/yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyDepositSummary;
