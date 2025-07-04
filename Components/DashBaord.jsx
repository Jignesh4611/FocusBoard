import React from 'react'
import { useAuth } from '../src/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../src/firebase';

const DashBaord = () => {
    const {user} = useAuth();
    const navigate =useNavigate();

    async function handleLogOut ()
    {
        await signOut(auth);
        navigate('/login');
    }
        if (!user) {
        return <p>Loading user info...</p>;
    }

  return (
     
        <div>
            <p>Welcome to the dashboard {user.email}</p>
            <button onClick={handleLogOut}>Logout</button>
        </div>
  )
}

export default DashBaord
