import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/aikyam")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.members);
        setMembers(data.members);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // Function to handle selecting a member for detailed view
  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  // Function to clear selected member
  const clearSelectedMember = () => {
    setSelectedMember(null);
  };

  // Function to handle deleting a member
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/delete/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        setMembers(members.filter((member) => member.id !== id));
        setNotification("Member has been deleted");
        setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
      })
      .catch((error) => console.error("Delete error:", error));
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Members List</h1>
      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.user_id}
                    onClick={() => handleMemberClick(member)}
                  >
                    <td>{member.id}</td>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                    <td>{member.email}</td>
                    <td>{member.number}</td>
                    <td>{member.address}</td>
                    <td>{member.gender}</td>
                    <td>
                      <Link
                        to={`/edit/${member.id}`}
                        className="btn btn-outline-primary"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <span style={{ marginRight: "10px" }}></span>
                      <button
                        className="btn btn-outline-danger"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering row click
                          handleDelete(member.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
