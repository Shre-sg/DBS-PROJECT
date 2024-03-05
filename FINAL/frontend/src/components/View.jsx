import { Link } from 'react-router-dom';
import image from '../assets/rocket.png'; 
import image1 from '../assets/rvce.png';
import image2 from '../assets/team.png';
import Graph from './Graph';
import Axios from 'axios';

const View = () => {
  const handleLogout = () => {
    Axios.post('http://localhost:3000/logout')
      .then(response => {
        localStorage.clear(); // Clear local storage upon successful logout
        console.log(response.data.msg); // Log the logout message
        // Redirect to the login page
        window.location.href = '/login';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div>
      <div className="container mt-5">
        {/* Top left logo */}
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <img src={image1} alt="RVCE Logo" style={{ width: '130px' }} />
        </div>
        {/* Top right logo */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <img src={image2} alt="Team Logo" style={{ width: '200px' }} />
        </div>

        <h2 className="text-center mb-4">DASHBOARD OF TEAM ANTARIKSH</h2>
        <div className="d-flex justify-content-center">
          <img src={image} alt="Rocket" style={{ width: '200px', marginRight: '20px' }} /> {/* Add the image here */}
          <div className="btn-group-vertical">
            <Link to="/recovery" className="btn btn-primary btn-lg mb-2">RECOVERY</Link>
            <Link to="/avionics" className="btn btn-primary btn-lg mb-2">AVIONICS</Link>
            <Link to="/aerostructures" className="btn btn-primary btn-lg mb-2">AEROSTRUCTURES</Link>
            <Link to="/payload" className="btn btn-primary btn-lg mb-2">PAYLOAD</Link>
            <Link to="/propulsion" className="btn btn-primary btn-lg mb-2">PROPULSION</Link>
          </div>
        </div>
      </div>
      <Graph />
      
      {/* Buttons for View Full Data and Logout */}
      <div className="container mt-3 text-center">
        <Link to="/data" className="btn btn-primary mr-2">View Full Database</Link>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default View;
