import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';

const IndividualContribution = () => {
    const [IndividualContribution, setIndividualContribution] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/indivi')
            .then(response => response.json())
            .then(data => {
                console.log(data.individual_summary);
                setIndividualContribution(data.individual_summary);
            })
            .catch(error => console.error(error));
    }, []);

    let sn = 1;

    return (
        <div className="row">            
            <NavBar/>
            <div className="col-lg-12 stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h1>Individual Contribution</h1>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>SN</th>                                        
                                        <th>Member Id</th>
                                        <th>First Name</th>
                                        <th>Total Amount</th>
                                        <th>Number</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {IndividualContribution.map(Individual => (
                                        <tr >
                                            <td>{sn++}</td>
                                            <td>{Individual.member_id}</td>
                                            <td>{Individual.first_name}</td>
                                            <td>{Individual.total_amount}</td>
                                            <td>{Individual.number}</td>
                                            <td>{Individual.deposit_date}</td>
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

export default IndividualContribution;
