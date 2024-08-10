import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const DepositHistory = () => {
  const [history, setHistory] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "amount",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data && data.deposite) {
          setHistory(data.deposite);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const sortHistory = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const sortedHistory = React.useMemo(() => {
    let sortableHistory = [...history];
    if (sortConfig.key && sortConfig.direction) {
      sortableHistory.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableHistory;
  }, [history, sortConfig]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log("Sorted history:", sortedHistory);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">History List</h1>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User ID</th>
                      <th>First name</th>
                      <th>Email</th>
                      <th>
                        Amount{" "}
                        <div className="d-inline-block">
                          <button
                            className="btn btn-sm btn-link text-light"
                            onClick={() => sortHistory("amount", "ascending")}
                          >
                            <FontAwesomeIcon
                              icon={faSortUp}
                              size="sm" // Set icon size to small
                              className="align-middle"
                            />
                          </button>
                          <button
                            className="btn btn-sm btn-link text-light"
                            onClick={() => sortHistory("amount", "descending")}
                          >
                            <FontAwesomeIcon
                              icon={faSortDown}
                              size="sm" // Set icon size to small
                              className="align-middle"
                            />
                          </button>
                        </div>
                      </th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((deposit, index) => (
                      <tr key={index}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{deposit.member_id}</td>
                        <td>{deposit.first_name}</td>
                        <td>{deposit.email}</td>
                        <td>{deposit.amount}</td>
                        <td>{deposit.deposit_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <nav className="mt-3">
                <ul className="pagination justify-content-end">
                  {[
                    ...Array(
                      Math.ceil(sortedHistory.length / itemsPerPage)
                    ).keys(),
                  ].map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(number + 1)}
                        className="page-link"
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositHistory;
