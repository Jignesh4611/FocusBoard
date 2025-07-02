import React from "react"
import { useAuth } from "../src/AuthContext/AuthContext"


const signInUsingGithub = () => {
    const { signInUsingGitHub } = useAuth();
    const handleSubmit = async () => {
        await signInUsingGitHub();
        console.log("login using github done");
    }
    
    return (
        <div>
            <button onClick={handleSubmit}>SignIn Using Github</button>
        </div>
    )
}
export default signInUsingGithub