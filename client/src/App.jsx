import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const syncRole = () => {
      setRole(localStorage.getItem('role'));
    };
    window.addEventListener('storage', syncRole);
    return () => window.removeEventListener('storage', syncRole);
  }, []);

  return (
    <Router>
      <Navbar role={role} setRole={setRole} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            role ? (
              <Navigate to="/" replace />
            ) : (
              <Login setRole={setRole} />
            )
          }
        />
        <Route
          path="/admin"
          element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
        />
      </Routes>

      {/* Show chatbot only when logged in */}
      {role && <ChatBot />}
      <Footer />
    </Router>
  );
}

export default App;
