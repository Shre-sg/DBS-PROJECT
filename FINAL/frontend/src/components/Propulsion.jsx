import { useState, useEffect } from 'react';
import axios from 'axios';

const Avionics = () => {
    const [joinedData, setJoinedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/propulsion');
                setJoinedData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Propulsion Data</h1>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Division Name</th>
                            <th>USN</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Component ID</th>
                            <th>Component Name</th>
                            <th>Details</th>
                            <th>Transaction ID</th>
                            <th>Quantity</th>
                            <th>GSTIN Number</th>
                            <th>Date</th>
                            <th>Total Cost</th>
                            <th>Product ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedData.map(row => (
                            <tr key={row.Transaction_ID}>
                                <td>{row.Div_Name}</td>
                                <td>{row.USN}</td>
                                <td>{row.First_Name}</td>
                                <td>{row.Last_Name}</td>
                                <td>{row.Phone_Number}</td>
                                <td>{row.Email}</td>
                                <td>{row.Component_ID}</td>
                                <td>{row.Component_Name}</td>
                                <td>{row.DETAILS}</td>
                                <td>{row.Transaction_ID}</td>
                                <td>{row.Quantity}</td>
                                <td>{row.GSTIN_Number}</td>
                                <td>{row.Date}</td>
                                <td>{row.Total_Cost}</td>
                                <td>{row.Product_ID}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Avionics;
