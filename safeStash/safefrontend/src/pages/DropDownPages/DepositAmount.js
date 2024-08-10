import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Deposit = () => {
  const [memberId, setMemberId] = useState("");
  const [amount, setAmount] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const handleMemberIdChange = (event) => {
    setSelectedMemberId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDepositDateChange = (event) => {
    setDepositDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://127.0.0.1:8000/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: selectedMemberId,
        amount: data.get("amount").trim(),
        depositDate: data.get("depositDate").trim(),
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData["status"] === "success") {
          event.target.reset();
          setResponseStatus("success");
          setSuccessMessage("Amount has been successfully deposited.");
          setOpen(true);
          // Clear the input details
          setSelectedMemberId("");
          setAmount("");
          setDepositDate("");
          setTimeout(() => {
            setSuccessMessage("");
            setOpen(false);
          }, 2000);
        } else {
          setResponseStatus("fail");
        }
      });
  };

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mt-4">
      <h4 className="card-title">Deposit Form</h4>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>{successMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="card">
        <div className="card-body">
          <form className="form-sample" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <Select
                  label="Member"
                  variant="outlined"
                  fullWidth
                  value={selectedMemberId}
                  onChange={handleMemberIdChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Name
                  </MenuItem>
                  {members.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.first_name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="col-md-4">
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  label="Deposit Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="depositDate"
                  value={depositDate}
                  onChange={handleDepositDateChange}
                />
              </div>
              <div className="col-12 mt-3">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
