import { Link } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.min.css'; // Import the Bootswatch "Lux" theme

const Dashboard = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Add margin top for spacing */}
      <h2 className="text-center mb-4">Money - Pilot</h2> {/* Center the text and add margin bottom */}
      <nav className="text-center">
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>{' '}
        {/* Add button styles */}
        <Link to="/register" className="btn btn-success">
          Register
        </Link>{' '}
        {/* Add button styles */}
      </nav>
    </div>
  );
};

export default Dashboard;