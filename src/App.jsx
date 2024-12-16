import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

// Importing components
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register'; // Ensure this matches the actual file name

// PrivateRoute component to protect dashboard route
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Allow access to the dashboard if token exists
  return children;
}

function App() {
  return (
    <>
      <Router>
        <Row>
          <Col md={12}>
            <Routes>
              {/* Default route to Login */}
              <Route path="/" element={<Login />} />
              
              {/* Explicit login route */}
              <Route path="/login" element={<Login />} />
              
              {/* Register route */}
              <Route path="/register" element={<Register />} />
              
              {/* Protected Dashboard route */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default App;