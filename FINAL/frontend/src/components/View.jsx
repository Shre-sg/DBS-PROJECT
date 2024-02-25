import { Link } from 'react-router-dom';
import image from '../assets/rocket.png'; // Import the image at the beginning of the file

const View = () => {
  return (
    <div className="container mt-5">
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
  );
};

export default View;