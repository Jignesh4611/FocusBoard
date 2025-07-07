import React from "react";
import { useAuth } from "../src/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardHome = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user]);

  if (loading) return <p>Loading...</p>; // or spinner

  return (
    <>
      <p>this is home dash home</p>
    </>
  );
};
export default DashboardHome;