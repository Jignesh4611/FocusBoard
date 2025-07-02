import React from "react";
import { useAuth } from "../src/AuthContext/AuthContext";
const SignInButton = () => {
  const { signInUsingGoogle } = useAuth();

  const handleSignin = async() => {
        await signInUsingGoogle();
        console.log("login using google done")
  }
  return (
    <button onClick={handleSignin}>Sign in With Google</button>
  )

}
export default SignInButton;
