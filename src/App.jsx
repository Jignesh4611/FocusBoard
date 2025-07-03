import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from '../Components/NavBar'
import { UserProvider } from './AuthContext/AuthContext'
import SignInUsingGitHub from '../Components/SignInUsingGitHub'
import PrivateRoute from '../Components/PrivateRoute'
import DashBaord from '../Components/DashBaord'
import SigninGoogle from '../Components/SigninGoogle'

function App() {

  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signInGoogle' element={<SigninGoogle/>} />
          <Route path='/signInGithub' element={<SignInUsingGitHub/>}/>
          <Route path='/DashBoard' element={<PrivateRoute>
            <DashBaord/>
          </PrivateRoute>}/>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
