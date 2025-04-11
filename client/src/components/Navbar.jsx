import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🛍️ ShopSmart</Link>
      </div>
      <div className="navbar-links">
        {role ? (
          <>
            {role === 'admin' && <Link to="/admin">Dashboard</Link>}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
