import React, { useState } from 'react'
import { auth } from '../src/firebase'
import { useAuth } from '../src/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const { signIn } = useAuth();

    const [user, setuser] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn(user, pass);
        navigate("/dashboard");

        console.log("sign in complete");
    }

    return (
        <div>
            <form>
                <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    placeholder="Email"
                    value={user}
                    onChange={(e) => setuser(e.target.value)}
                />

                <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

        </div>
    )
}

export default Login
