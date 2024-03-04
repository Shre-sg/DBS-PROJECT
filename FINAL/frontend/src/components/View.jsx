import { Link } from 'react-router-dom';
import image from '../assets/rocket.png'; 
import image1 from '../assets/rvce.png';
import image2 from '../assets/team.png';
import Graph from './Graph';

const View = () => {
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
    </div>
  );
};

export default View;
