import React, { useState, useEffect } from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TotalSavings = () => {
  const [totalSaving, setTotalSaving] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/monthly")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.monthly_summary);
        setTotalSaving(data.monthly_summary);
        setTotalDeposits(
          data.monthly_summary.reduce((acc, cur) => acc + cur.total_amount, 0)
        );
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" gutterBottom>
            Total Savings
          </Typography>
          <Typography variant="h5">
            Total Savings Amount: {totalDeposits}
          </Typography>
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={totalSaving}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total_amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TotalSavings;
