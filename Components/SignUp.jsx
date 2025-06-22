import React, { useState } from 'react'
import { auth } from '../src/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [text, setText] = useState("");
    const [pass, setPass] = useState("")
    const [message, setMessage] = useState()
    function handleSubmit(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,text,pass)
        .then((UserCredential)=>{
            setMessage("user created sccessfully")
        })
        .catch((error)=>{
            console.error("error created", error)
            setMessage("error occur")
            
        })
        
        console.log("Username:", text);
        console.log("Password:", pass);
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
            {message&&<p>{message}</p>}
        </div>
    )
}
export default SignUp
