import React, { createContext, useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, getIdToken } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);
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
    const signInUsingGitHub = async () => {
        const provider = new GithubAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user)
        } catch (error) {
            console.error("GithubSign error", error.message);
        }
    }
    const logout = () => {
        return signOut(auth);
    };
    return (
        <AuthContext.Provider value={{ user, logout, addUser, signIn, signInUsingGoogle, signInUsingGitHub }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);