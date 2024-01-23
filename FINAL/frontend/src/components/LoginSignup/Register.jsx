import { useState } from 'react';
import axios from 'axios';
import './LoginSignUp.css';

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
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default Register;
