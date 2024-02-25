import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.min.css'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import View from './components/View'; 
import Dashboard from './components/Dashboard'; 
import Aerostructures from './components/Aerostructures';
import Avionics from './components/Avionics';
import Payload from './components/Payload';   
import Recovery from './components/Recovery'; 
import Propulsion from './components/Propulsion'; 

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view" element={<View />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/avionics" element={<Avionics />} />
          <Route path="/aerostructures" element={<Aerostructures />} />
          <Route path="/payload" element={<Payload />} />
          <Route path="/propulsion" element={<Propulsion />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
