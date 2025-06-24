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

function App() {

  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
