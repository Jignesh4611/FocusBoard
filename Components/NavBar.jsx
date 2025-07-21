import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContext/AuthContext';
import '../src/App.css';


const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Auth-system</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <Link className="nav-button" to="/dashboard">Dashboard</Link>
            <Link className="nav-button" to="/tasks">Go to Tasks</Link>
            <button className="nav-button logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-button" to="/">Home</Link>
            <Link className="nav-button" to="/login">Login</Link>
            <Link className="nav-button" to="/signup">Signup</Link>
            <Link className="nav-button" to="/signInGoogle">SignUsingGoogle</Link>
            <Link className="nav-button" to="/signInGithub">SignUsingGitHub</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
