import React from "react"
import { useAuth } from "../src/AuthContext/AuthContext"
import { useNavigate } from "react-router-dom";


const signInUsingGithub = () => {
    const { signInUsingGitHub } = useAuth();
     const navigate = useNavigate();
    const handleSubmit = async () => {
        await signInUsingGitHub();
        console.log("login using github done");
        navigate("/dashboard");
    }

    return (
        <div>
            <button onClick={handleSubmit}>SignIn Using Github</button>
        </div>
    )
}
export default signInUsingGithub