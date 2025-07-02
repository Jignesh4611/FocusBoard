import React, { useState } from 'react'
import { auth } from '../src/firebase'
import { useAuth } from '../src/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const {signIn} = useAuth();
    const [user, setuser] = useState("")
    const [pass, setPass] = useState("")
      const navigate = useNavigate(); // 👈 Hook for redirect

    const handleSubmit =async (e) => {
        e.preventDefault();
        await signIn(user,pass);
                navigate("/dashboard"); // ✅ Redirect after login

        console.log("sign in complete"); 
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={user}
                    onChange={(e) => setuser(e.target.value)}
                    placeholder='userName'
                />
                <input
                    type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='password'
                />
                <button>sign-in</button>

            </form>
        </div>
    )
}

export default Login
