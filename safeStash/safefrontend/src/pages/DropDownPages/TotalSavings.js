import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

const TotalSavings = () => {
    const [totalSaving, setTotalSaving] = useState([]);
    const [totalDeposits, setTotalDeposits] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/monthly')
            .then(response => response.json())
            .then(data => {
                console.log(data.total_deposit);
                setTotalSaving(data.total_deposit);
                setTotalDeposits(data.total_deposit.reduce((acc, cur) => acc + cur.total_amount, 0));
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <NavBar />
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h3" gutterBottom>Total Savings</Typography>
                    <Typography variant="h5">Total Savings Amount: {totalDeposits}</Typography>
                    <Typography variant="h5">Number of Deposits: {totalSaving.length}</Typography>
                    <Typography variant="h5">Average Deposit: {totalDeposits / totalSaving.length}</Typography>
                    <List>
                        {totalSaving.map(individual => (
                            <ListItem key={individual.id}>
                                <ListItemText primary={`Date: ${individual.date}, Amount: ${individual.total_amount}`} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default TotalSavings;
