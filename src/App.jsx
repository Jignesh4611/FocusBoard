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
import { useRoutes } from 'react-router-dom'
import DashBoardRoute from '../routes/DashBoardRoute'

function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/signInGoogle', element: <SigninGoogle /> },
    { path: '/signInGithub', element: <SignInUsingGitHub /> },
    {
    path: DashBoardRoute.path,
    element: <PrivateRoute>{DashBoardRoute.element}</PrivateRoute>, // ✅ fixed
    children: DashBoardRoute.Children 
  }
  ])


  return (
    <>
      <UserProvider>
        <NavBar />
        {routes}
      </UserProvider>
    </>
  )
}

export default App
