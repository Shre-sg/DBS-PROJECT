import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.min.css'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import View from './components/View'; 
import Dashboard from './components/Dashboard'; 

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
