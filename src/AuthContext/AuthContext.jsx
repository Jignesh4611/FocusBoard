import React, { createContext, useContext,useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
    const signIn= async(email,pass)=>{
        const userCredintial= await signInWithEmailAndPassword(auth,email,pass)
                try {
                      setUser(userCredintial.user);
                } catch (error) {
                    console.error(error);
                }

    }
    return (
        <AuthContext.Provider value={{ user, addUser,signIn }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);