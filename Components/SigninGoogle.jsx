import React from "react";
import { useAuth } from "../src/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
const SigninGoogle = () => {
  const { signInUsingGoogle } = useAuth();
 const navigate = useNavigate();
  const handleSignin = async() => {
        await signInUsingGoogle();
        console.log("login using google done")
        navigate("/dashboard");
  }
  return (
    <button onClick={handleSignin}>Sign in With Google</button>
  )

}
export default SigninGoogle;
