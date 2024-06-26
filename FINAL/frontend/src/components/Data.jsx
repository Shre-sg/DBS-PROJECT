import { useState, useEffect } from 'react';
import Axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Data = () => {
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:3000/data') 
            .then(response => {
                setData(response.data);
                setDataFetched(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleGeneratePDF = () => {
        console.log('Generating PDF...');
        const doc = new jsPDF();
        const tableData = [];
        data.forEach(item => {
            const rowData = [
                item.Division_Name,
                item.USN,
                item.First_Name,
                item.Last_Name,
                item.Phone_Number,
                item.Student_Email,
                item.Component_ID,
                item.Component_Name,
                item.DETAILS,
                item.Transaction_ID,
                item.Quantity,
                item.GSTIN_Number,
                new Date(item.Date).toLocaleDateString(),
                item.Total_Cost
            ];
            tableData.push(rowData);
        });

        doc.autoTable({
            head: [['Division Name', 'USN', 'First Name', 'Last Name', 'Phone Number', 'Student Email', 'Component ID', 'Component Name', 'Details', 'Transaction ID', 'Quantity', 'GSTIN Number', 'Date', 'Total Cost']],
            body: tableData,
            styles: {
                fontSize: 3 // Set the font size to a smaller value
            }
        });

        doc.save('data.pdf');
        console.log('PDF generated successfully.');
    };

    return (
        <div>
            <style>
                {`
                    body {
                        padding-right: 50px;
                        padding-bottom: 50px;
                    }
                `}
            </style>
            <div style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>Data from Backend</h1>
                {dataFetched && <button onClick={handleGeneratePDF}>Generate PDF</button>}
                <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Division Name</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>USN</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>First Name</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Last Name</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Phone Number</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Student Email</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Component ID</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Component Name</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Details</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Transaction ID</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Quantity</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>GSTIN Number</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Date</th>
                            <th style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.Transaction_ID} style={{ backgroundColor: '#ffffff' }}>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Division_Name}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.USN}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.First_Name}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Last_Name}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Phone_Number}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Student_Email}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Component_ID}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Component_Name}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.DETAILS}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Transaction_ID}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Quantity}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.GSTIN_Number}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{new Date(item.Date).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #dddddd', padding: '10px', textAlign: 'left' }}>{item.Total_Cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Data;
