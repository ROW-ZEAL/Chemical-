import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { FaDownload } from "react-icons/fa";

const IndividualSummary = () => {
  const { firstName } = useParams();
  const [individualSummaries, setIndividualSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/individual-history/${firstName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setIndividualSummaries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [firstName]);

  const handleDownload = () => {
    const headers = [
      "Deposit Date",
      "First Name",
      "Amount",
      "Address",
      "Phone Number",
    ];
    const csvData = [
      headers.join(","),
      ...individualSummaries.map((summary) => {
        // Format date as YYYY-MM-DD
        const formattedDate = new Date(summary.deposit_date)
          .toISOString()
          .slice(0, 10);
        return `${formattedDate},${summary.first_name},${summary.amount},${summary.address},${summary.number}`;
      }),
    ].join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${firstName}_individual_summaries.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!individualSummaries || individualSummaries.length === 0) {
    return <div>No individual summaries available.</div>;
  }

  return (
    <div className="row">
      <div className="col-lg-12 stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <FaDownload onClick={handleDownload} />
              <h1 className="mb-4">Summary of Deposits for {firstName}</h1>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Deposit Date</th>
                    <th>First Name </th>
                    <th>Amount</th>
                    <th>Address</th>
                    <th>Ph No</th>
                  </tr>
                </thead>
                <tbody>
                  {individualSummaries.map((summary) => (
                    <tr key={summary.id}>
                      <td>{summary.deposit_date}</td>
                      <td>{summary.first_name}</td>
                      <td>{summary.amount}</td>
                      <td>{summary.address}</td>
                      <td>{summary.number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSummary;
