import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../src/AuthContext/AuthContext'

const NavBar = () => {
    const { user, logout } = useAuth();
    const hadleLogout = async () => {
        try {
            await logout();
            console.log("Logged out successfully");
        } catch (err) {
            console.error("Logout error:", err.message);
        }
    };

    return (
        <>
            <div>
                <Link to='/' >Auth-system</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span>{user.email}</span>
                        <button onClick={hadleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        <Link to='/signInGoogle'>SignUsingGoogle</Link>
                        <Link to='/signInGithub'>SignUsingGitHub</Link>

                    </>
                )}

            </div>
        </>
    )
}

export default NavBar
