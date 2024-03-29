import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MonthlyDepositSummary = () => {
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/monthly')
            .then(response => response.json())
            .then(data => {
                console.log(data.monthly_summary);
                setMonthlySummary(data.monthly_summary);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (monthlySummary.length === 0) {
        return <div>No monthly summaries available.</div>;
    }

    return (
        <div className="container mt-5">
            <NavBar />
            <h1 className="mb-4">Monthly Summary List</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">SN</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlySummary.map((summary, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{summary.total_amount}</td>
                                <td>{format(new Date(summary.deposit_date), 'dd/MM/yyyy')}</td>
                                <td>
                                <button className="btn btn-outline-primary mr-4"><FaEdit /></button>
                                <button className="btn btn-outline-danger"><FaTrash /></button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MonthlyDepositSummary;
