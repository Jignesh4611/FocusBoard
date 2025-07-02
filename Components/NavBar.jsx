import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <div>
                <Link to='/' >Auth-system</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>login</Link>
                <Link to='/signUp'>Signup</Link>
                <Link to='/signInGoogle'>SignUsingGoogle</Link>
                <Link to='/signInGithub'>SignUsingGitHub</Link>

            </div>
        </>
    )
}

export default NavBar
