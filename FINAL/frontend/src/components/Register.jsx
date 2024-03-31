import { useState } from 'react';
import axios from 'axios';
import 'bootswatch/dist/lux/bootstrap.min.css';
import rvceLogo from '../assets/rvce.png';
import teamLogo from '../assets/team.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
      });
      console.log(response.data.msg);
     
      window.location.href = '/login'; 
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div>
      {/* Left Logo */}
      <img src={rvceLogo} alt="RVCE Logo" style={{ position: 'absolute', top: '10px', left: '10px', width: '130px' }} />
      
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center mb-4">Register</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleRegister}
            >
              Register
            </button>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Right Logo */}
      <img src={teamLogo} alt="Team Logo" style={{ position: 'absolute', top: '10px', right: '10px', width: '200px' }} />
    </div>
  );
};

export default Register;
