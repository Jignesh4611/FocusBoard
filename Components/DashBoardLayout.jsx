import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './DashBoardLayout.css';

const DashBoardLayout = () => {
  return (
    <div className="dashboard-layout-container">
      <h3 className="dashboard-title">Dashboard</h3>
      <nav className="dashboard-nav">
        <Link to="/dashboard">Main</Link> |{" "}
        <Link to="/dashboard/dashhome">Home</Link> |{" "}
        <Link to="/dashboard/profile">Profile</Link> |{" "}
        <Link to="/dashboard/setting">Setting</Link>
      </nav>
      <div className="dashboard-divider"></div>
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
