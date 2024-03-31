import  { useState, useEffect } from 'react';
import axios from 'axios';

const Payload = () => {
    const [originalData, setOriginalData] = useState([]);
    const [joinedData, setJoinedData] = useState([]);
    const [formData, setFormData] = useState({
        student: {},
        component: {},
        transaction: {}
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [searchOptionsVisible, setSearchOptionsVisible] = useState(false);
    const [searchOptions, setSearchOptions] = useState({
        minCost: '',
        maxCost: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/payload');
            setOriginalData(response.data);
            setJoinedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        
        const validationRules = {
            'student.USN': value => /^[a-zA-Z0-9]*$/.test(value), // Alphanumeric characters allowed
            'student.First_Name': value => /^[a-zA-Z]*$/.test(value), // Only letters allowed
            'student.Last_Name': value => /^[a-zA-Z]*$/.test(value), // Only letters allowed
            'student.Phone_Number': value => /^\d+$/.test(value), // Only digits allowed
            'student.Email': value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Email format validation
            'component.Component_ID': value => /^[a-zA-Z0-9]*$/.test(value), // Alphanumeric characters allowed
            'component.Component_Name': value => /^[a-zA-Z\s]*$/.test(value), // Only letters and spaces allowed
            'component.DETAILS': value => /^[a-zA-Z\s]*$/.test(value), // Only letters and spaces allowed
            'transaction.Transaction_ID': value => /^\d+$/.test(value), // Only digits allowed
            'transaction.Quantity': value => /^\d+$/.test(value), // Only digits allowed
            'transaction.GSTIN_Number': value => /^[a-zA-Z0-9]*$/.test(value), // Alphanumeric characters allowed
            'transaction.Date': value => !isNaN(Date.parse(value)), // Date format validation
            'transaction.Total_Cost': value => /^\d+(\.\d+)?$/.test(value), // Float format validation
        };

        const validate = validationRules[name];
        if (validate && !validate(value)) {
            return;
        }

        setFormData(prevState => ({
            ...prevState,
            [name.split('.')[0]]: {
                ...prevState[name.split('.')[0]],
                [name.split('.')[1]]: value
            }
        }));
    };

    const handleAddData = async () => {
        try {
            await axios.post('http://localhost:3000/payload', formData);
            setDialogOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleSearch = () => {
        const trimmedSearchQuery = searchQuery.trim().toLowerCase(); // Convert search query to lowercase for case-insensitive matching

        // Filter data based on USN or student name (first name or last name)
        let filteredData = originalData.filter(row => {
            const studentFullName = `${row.First_Name.toLowerCase()} ${row.Last_Name.toLowerCase()}`; // Combine first name and last name
            return (
                row.USN.toLowerCase().includes(trimmedSearchQuery) || // Check if USN includes search query
                studentFullName.includes(trimmedSearchQuery) // Check if student name includes search query
            );
        });

        // Apply filters based on search options
        filteredData = filteredData.filter(row => {
            const cost = parseFloat(row.Total_Cost);
            const rowDate = new Date(row.Date);

            return (
                (searchOptions.minCost === '' || cost >= parseFloat(searchOptions.minCost)) &&
                (searchOptions.maxCost === '' || cost <= parseFloat(searchOptions.maxCost)) &&
                (searchOptions.startDate === '' || rowDate >= new Date(searchOptions.startDate)) &&
                (searchOptions.endDate === '' || rowDate <= new Date(searchOptions.endDate))
            );
        });

        setJoinedData(filteredData);
        setSearched(true);
    };

    const handleResetSearch = () => {
        setSearchQuery('');
        setSearchOptions({
            minCost: '',
            maxCost: '',
            startDate: '',
            endDate: ''
        });
        setJoinedData(originalData);
        setSearched(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Payload Data</h1>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by USN or NAME"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>

            {searched && (
                <button className="btn btn-secondary mb-3" onClick={handleResetSearch}>Reset Search</button>
            )}

            <div className="d-flex align-items-center mb-3">
                <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => setSearchOptionsVisible(!searchOptionsVisible)}
                >
                    {searchOptionsVisible ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {searchOptionsVisible && (
                <div className="form-row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cost Range (Minimum)"
                            value={searchOptions.minCost}
                            onChange={(e) => setSearchOptions({...searchOptions, minCost: e.target.value})}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cost Range (Maximum)"
                            value={searchOptions.maxCost}
                            onChange={(e) => setSearchOptions({...searchOptions, maxCost: e.target.value})}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Start Date"
                            value={searchOptions.startDate}
                            onChange={(e) => setSearchOptions({...searchOptions, startDate: e.target.value})}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="End Date"
                            value={searchOptions.endDate}
                            onChange={(e) => setSearchOptions({...searchOptions, endDate: e.target.value})}
                        />
                    </div>
                </div>
            )}

            <button className="btn btn-primary mb-3" onClick={() => setDialogOpen(true)}>Add Data</button>

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

            {dialogOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Data</h5>
                                <button type="button" className="close" onClick={() => setDialogOpen(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Student details */}
                                <input type="text" name="student.USN" placeholder="USN" onChange={handleInputChange} />
                                <input type="text" name="student.First_Name" placeholder="First Name" onChange={handleInputChange} />
                                <input type="text" name="student.Last_Name" placeholder="Last Name" onChange={handleInputChange} />
                                <input type="text" name="student.Phone_Number" placeholder="Phone Number" onChange={handleInputChange} />
                                <input type="text" name="student.Email" placeholder="Email" onChange={handleInputChange} />

                                {/* Component details */}
                                <input type="text" name="component.Component_ID" placeholder="Component ID" onChange={handleInputChange} />
                                <input type="text" name="component.Component_Name" placeholder="Component Name" onChange={handleInputChange} />
                                <input type="text" name="component.DETAILS" placeholder="Details" onChange={handleInputChange} />

                                {/* Transaction details */}
                                <input type="text" name="transaction.Transaction_ID" placeholder="Transaction ID" onChange={handleInputChange} />
                                <input type="text" name="transaction.Quantity" placeholder="Quantity" onChange={handleInputChange} />
                                <input type="text" name="transaction.GSTIN_Number" placeholder="GSTIN Number" onChange={handleInputChange} />
                                <input type="text" name="transaction.Date" placeholder="Date" onChange={handleInputChange} />
                                <input type="text" name="transaction.Total_Cost" placeholder="Total Cost" onChange={handleInputChange} />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setDialogOpen(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddData}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payload;
