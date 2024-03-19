import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; 

const Deposit = () => {
    const [memberId, setMemberId] = useState('');
    const [amount, setAmount] = useState('');
    const [depositDate, setDepositDate] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleMemberIdChange = (event) => {
        setMemberId(event.target.value);
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
            memberId: data.get("memberId").trim(),
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
              setTimeout(() => {
                setSuccessMessage('');
                setOpen(false);
              }, 2000);
            } else {
              setResponseStatus("fail");
            }
          });
      };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="row">
            <NavBar/>
            <h4 className="card-title">Add Member</h4>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    {successMessage}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <form className="form-sample" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Member ID"
                                        variant="outlined"
                                        fullWidth
                                        name="memberId"
                                        value={memberId}
                                        onChange={handleMemberIdChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Amount"
                                        variant="outlined"
                                        fullWidth
                                        name="amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deposit;
