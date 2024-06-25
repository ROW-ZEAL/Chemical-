import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/aikyam")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.members);
        setMembers(data.members);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="row">
      <NavBar />
      <div className="col-lg-12 stretch-card">
        <div className="card">
          <div className="card-body">
            <h1>Members List</h1>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.user_id}>
                      <td>{member.id}</td>
                      <td>{member.first_name}</td>
                      <td>{member.last_name}</td>
                      <td>{member.email}</td>
                      <td>{member.number}</td>
                      <td>{member.address}</td>
                      <td>{member.gender}</td>
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

export default MemberList;
