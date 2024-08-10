import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditIndividual = () => {
  const { id } = useParams();
  console.log(id);

  const [individual, setIndividual] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editedFields, setEditedFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "", // Changed from 'phone_number' to 'number'
    address: "",
    gender: "",
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/edit/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const { first_name, last_name, email, number, address, gender } =
            data[0];
          setIndividual(data[0]);
          setEditedFields({
            first_name: first_name || "",
            last_name: last_name || "",
            email: email || "",
            number: number || "", // Updated to use 'number' from fetched data
            address: address || "",
            gender: gender || "",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Include the ID in the edited fields
    const updatedData = {
      id: individual.id, // Assuming individual object has id field
      ...editedFields,
    };

    // Print updated values to console
    console.log("Updated Values:", updatedData);

    // Perform submit logic here (e.g., API call to update data)
    fetch(`http://localhost:8000/api/edit/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data updated successfully:", data);
        // Optionally handle success feedback or redirection
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle error feedback
      });
  };

  const handleChange = (e, fieldName) => {
    const value = e.target.value;

    setEditedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Edit individual {id}</h1>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Number</th> {/* Updated label */}
            <th>Address</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{individual.id}</td>
            <td>{individual.first_name}</td>
            <td>{individual.last_name}</td>
            <td>{individual.email}</td>
            <td>{individual.number}</td> {/* Updated field to 'number' */}
            <td>{individual.address}</td>
            <td>{individual.gender}</td>
          </tr>
        </tbody>
      </table>
      <div className="container">
        <h1 className="mt-4 mb-4">Edit Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                name="first_name"
                type="text"
                className="form-control"
                value={editedFields.first_name}
                onChange={(e) => handleChange(e, "first_name")}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                name="last_name"
                type="text"
                className="form-control"
                value={editedFields.last_name}
                onChange={(e) => handleChange(e, "last_name")}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="text"
                className="form-control"
                value={editedFields.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Number</label> {/* Updated label */}
              <input
                name="number"
                type="text"
                className="form-control"
                value={editedFields.number}
                onChange={(e) => handleChange(e, "number")}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input
                name="address"
                type="text"
                className="form-control"
                value={editedFields.address}
                onChange={(e) => handleChange(e, "address")}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={editedFields.gender}
                onChange={(e) => handleChange(e, "gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditIndividual;
