import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';

const MonthlyDepositSummary = () => {
    const [MonthlySummary, setMonthlySummary] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/monthly')
            .then(response => response.json())
            .then(data => {
                console.log(data.monthly_summary);
                setMonthlySummary(data.monthly_summary);
            })
            .catch(error => console.error(error));
    }, []);

    // Initialize SN variable
    let sn = 1;

    return (
        <div className="row">            
            <NavBar/>
            <div className="col-lg-12 stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h1>Monthly Summary List</h1>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Total Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MonthlySummary.map(summary => (
                                        <tr >
                                            <td>{sn++}</td>
                                            <td>{summary.total_amount}</td>
                                            <td>{summary.deposit_date}</td>
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

export default MonthlyDepositSummary;
