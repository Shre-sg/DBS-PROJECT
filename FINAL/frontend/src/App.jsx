
// import { createRoot } from "react-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/LoginSignup/Login";
import Register from "./components/LoginSignup/Register";
//import Dashboard from "./Dashboard";
import "./components/LoginSignup/LoginSignUp.css";



const App = () => {
  return (
    <div>
      <h1>Authentication App</h1>
      <Login />
      <Register />
    </div>
  );
};

export default App;
