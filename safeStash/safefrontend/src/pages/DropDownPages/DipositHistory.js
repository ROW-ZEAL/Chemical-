import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar'


const DipositHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/history')
            .then(response => response.json())
            .then(data => {
                console.log(data.deposite);
                setHistory(data.deposite);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="row">            
            <NavBar/>
            <div className="col-lg-12 stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h1>History List</h1>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>First name</th>
                                        <th>Email</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history && history.map(member => (
                                        <tr key={member.member_id}>
                                            <td>{member.member_id}</td>
                                            <td>{member.first_name}</td>
                                            <td>{member.email}</td>
                                            <td>{member.amount}</td>
                                            <td>{member.deposit_date}</td>
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

export default DipositHistory;
