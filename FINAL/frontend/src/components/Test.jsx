import  { useState, useEffect } from 'react';
import Axios from 'axios';

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/test'); // Assuming your backend API endpoint is '/api'
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      <table>
        <thead>
          <tr>
            <th>Division Name</th>
            <th>USN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Student Email</th>
            <th>Component ID</th>
            <th>Component Name</th>
            <th>Details</th>
            <th>Student ID</th>
            <th>Transaction ID</th>
            <th>Quantity</th>
            <th>GSTIN Number</th>
            <th>Date</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Division_Name}</td>
              <td>{item.USN}</td>
              <td>{item.First_Name}</td>
              <td>{item.Last_Name}</td>
              <td>{item.Phone_Number}</td>
              <td>{item.Student_Email}</td>
              <td>{item.Component_ID}</td>
              <td>{item.Component_Name}</td>
              <td>{item.DETAILS}</td>
              <td>{item.Student_ID}</td>
              <td>{item.Transaction_ID}</td>
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
};

export default Test;





//NAME STARTING WITH A
// import { useState, useEffect } from 'react';
// import Axios from 'axios';

// const Test = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await Axios.get('http://localhost:3000/test'); // Assuming your backend API endpoint is '/test'
//         const filteredData = response.data.filter(item => item.First_Name.charAt(0).toUpperCase() === 'A');
//         setData(filteredData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Data from Backend</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Division Name</th>
//             <th>USN</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Phone Number</th>
//             <th>Student Email</th>
//             <th>Component ID</th>
//             <th>Component Name</th>
//             <th>Details</th>
//             <th>Student ID</th>
//             <th>Transaction ID</th>
//             <th>Quantity</th>
//             <th>GSTIN Number</th>
//             <th>Date</th>
//             <th>Total Cost</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{item.Division_Name}</td>
//               <td>{item.USN}</td>
//               <td>{item.First_Name}</td>
//               <td>{item.Last_Name}</td>
//               <td>{item.Phone_Number}</td>
//               <td>{item.Student_Email}</td>
//               <td>{item.Component_ID}</td>
//               <td>{item.Component_Name}</td>
//               <td>{item.DETAILS}</td>
//               <td>{item.Student_ID}</td>
//               <td>{item.Transaction_ID}</td>
//               <td>{item.Quantity}</td>
//               <td>{item.GSTIN_Number}</td>
//               <td>{item.Date}</td>
//               <td>{item.Total_Cost}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Test;
