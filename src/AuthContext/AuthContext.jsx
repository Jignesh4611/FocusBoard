import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import './AuthContext.css';

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
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      setUser(userCred.user);
      await updateLoginStreak(userCred.user);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (email, pass) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      setUser(userCred.user);
      await updateLoginStreak(userCred.user);
    } catch (error) {
      console.error(error);
    }
  };

  const signInUsingGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, provider);
      setUser(userCred.user);
      await updateLoginStreak(userCred.user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const signInUsingGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, provider);
      setUser(userCred.user);
      await updateLoginStreak(userCred.user);
    } catch (error) {
      console.error("GitHub sign-in error:", error.message);
    }
  };

  const logout = () => signOut(auth);

  return (
    <div className="auth-wrapper">
      <AuthContext.Provider value={{
        user, loading, logout,
        addUser, signIn,
        signInUsingGoogle, signInUsingGitHub
      }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
