import React, { createContext, useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, getIdToken } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Make sure you have exported db from firebase.js


const AuthContext = createContext(null);
const updateLoginStreak = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    const today = new Date().toDateString();
    let newStreak = 1;

    if (docSnap.exists()) {
        const data = docSnap.data();
        const lastLogin = data.lastLoginDate;
        const prevStreak = data.streak || 0;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastLogin === new Date(yesterday).toDateString()) {
            newStreak = prevStreak + 1;
        } else if (lastLogin === today) {
            newStreak = prevStreak;
        }
    }

    await setDoc(userRef, {
        email: user.email,
        lastLoginDate: today,
        streak: newStreak,
    }, { merge: true });
};

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    const addUser = async (email, pass) => {
        try {
            const userCredintial = await createUserWithEmailAndPassword(auth, email, pass);
            setUser(userCredintial.user);
            await updateLoginStreak(userCredintial.user);

        } catch (error) {
            console.error(error);
        }
    }
    const signIn = async (email, pass) => {
  try {
    const userCredintial = await signInWithEmailAndPassword(auth, email, pass);
    setUser(userCredintial.user);
    await updateLoginStreak(userCredintial.user); // ✅ add this
  } catch (error) {
    console.error(error);
  }
};

   const signInUsingGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    setUser(userCredential.user);
    await updateLoginStreak(userCredential.user); // ✅ add this
  } catch (error) {
    console.error("Google sign-in error:", error.message);
  }
};

   const signInUsingGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    setUser(userCredential.user);
    await updateLoginStreak(userCredential.user); // ✅ add this
  } catch (error) {
    console.error("Github sign-in error", error.message);
  }
};

    const logout = () => {
        return signOut(auth);
    };
    return (
        <AuthContext.Provider value={{ user, loading, logout, addUser, signIn, signInUsingGoogle, signInUsingGitHub }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);