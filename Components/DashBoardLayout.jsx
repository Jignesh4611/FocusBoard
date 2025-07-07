import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Dashboard</h3>
      <nav>
         <Link to="/dashboard">Main</Link> |{" "}
        <Link to="/dashboard/dashhome">Home</Link> |{" "}
        <Link to="/dashboard/profile">Profile</Link> |{" "}
        <Link to="/dashboard/setting">Setting</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
