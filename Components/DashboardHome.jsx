import React, { useEffect } from "react";
import { useAuth } from "../src/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import './DashboardHome.css';

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return <p className="loading-message">Loading...</p>; // or spinner

  return (
    <div className="dashboard-home-container">
      <h1 className="dashboard-home-title">Welcome to the Dashboard Home</h1>
      <p>This is the home dashboard.</p>
    </div>
  );
};

export default DashboardHome;
