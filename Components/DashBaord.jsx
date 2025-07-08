import React from 'react';
import { useAuth } from '../src/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../src/firebase';
import './DashBaord.css';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    async function handleLogOut() {
        await signOut(auth);
        navigate('/login');
    }

    if (!user) {
        return <p className="loading-message">Loading user info...</p>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome to the Dashboard</h1>
            <p className="user-email">Logged in as: {user.email}</p>
            <button className="logout-button" onClick={handleLogOut}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;

