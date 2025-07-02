import React, { createContext, useContext, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider,GithubAuthProvider, getIdToken } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const addUser = async (email, pass) => {
        try {
            const userCredintial = await createUserWithEmailAndPassword(auth, email, pass);
            setUser(userCredintial.user);
        } catch (error) {
            console.error(error);
        }
    }
    const signIn = async (email, pass) => {
        const userCredintial = await signInWithEmailAndPassword(auth, email, pass)
        try {
            setUser(userCredintial.user);
        } catch (error) {
            console.error(error);
        }

    }
    const signInUsingGoogle = async () => {
        const provider = new GoogleAuthProvider(); // ✅ required
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user);
        } catch (error) {
            console.error("Google sign-in error:", error.message);
        }
    };
    const signInUsingGitHub=async()=>{
        const provider =new GithubAuthProvider();
        try {
            const userCredential=await signInWithPopup(auth,provider);
            setUser(userCredential)
        } catch (error) {
            console.error("GithubSign error",error.message);
        }
    }
    return (
        <AuthContext.Provider value={{ user, addUser, signIn, signInUsingGoogle,signInUsingGitHub}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);