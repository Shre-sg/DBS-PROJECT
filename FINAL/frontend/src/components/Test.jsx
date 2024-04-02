import  { useState, useEffect } from 'react';

function Test() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(item => {
    return item.USN.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>Data from Backend</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by USN..."
      />
      <table>
        <thead>
          <tr>
            <th>SL_NO</th>
            <th>USN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Div Name</th>
            <th>Component ID</th>
            <th>Component Name</th>
            <th>Details</th>
            <th>Transaction ID</th>
            <th>Component ID2</th>
            <th>Component ID3</th>
            <th>Component Name2</th>
            <th>Component Name3</th>
            <th>Quantity</th>
            <th>GSTIN Number</th>
            <th>Date</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.SL_NO}>
              <td>{item.SL_NO}</td>
              <td>{item.USN}</td>
              <td>{item.First_Name}</td>
              <td>{item.Last_Name}</td>
              <td>{item.Phone_Number}</td>
              <td>{item.Email}</td>
              <td>{item.Div_Name}</td>
              <td>{item.Component_ID}</td>
              <td>{item.Component_Name}</td>
              <td>{item.DETAILS}</td>
              <td>{item.Transaction_ID}</td>
              <td>{item.Component_ID2}</td>
              <td>{item.Component_ID3}</td>
              <td>{item.Component_Name2}</td>
              <td>{item.Component_Name3}</td>
              <td>{item.Quantity}</td>
              <td>{item.GSTIN_Number}</td>
              <td>{item.Date}</td>
              <td>{item.Total_Cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;
