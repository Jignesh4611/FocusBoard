import React, { useState } from 'react'
import { auth } from '../src/firebase';
import { useAuth } from '../src/AuthContext/AuthContext';

const SignUp = () => {
    const { addUser } = useAuth();
    
    const [text, setText] = useState("");
    const [pass, setPass] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();

        await addUser(text, pass);
        console.log("Username:", text);
        console.log("Password:", pass);
        setPass("")
        setText("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='UserName' />
                <input type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='enter PassWord' />
                <button >Submit</button>
            </form>
        </div>
    )
}
export default SignUp
