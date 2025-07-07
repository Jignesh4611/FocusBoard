import { useState, useEffect } from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import SignUp from '../Components/SignUp';
import Login from '../Components/Login';
import Home from './pages/Home';
import NavBar from '../Components/NavBar';
import { UserProvider } from './AuthContext/AuthContext';
import SignInUsingGitHub from '../Components/SignInUsingGitHub';
import PrivateRoute from '../Components/PrivateRoute';
import DashBoardRoute from '../routes/DashBoardRoute';
import SigninGoogle from '../Components/SigninGoogle';
import TaskPage from './pages/TaskPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000000" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/signInGoogle', element: <SigninGoogle /> },
    { path: '/signInGithub', element: <SignInUsingGitHub /> },
    {
      path: DashBoardRoute.path,
      element: <PrivateRoute>{DashBoardRoute.element}</PrivateRoute>,
      children: DashBoardRoute.children
    },
    { path: '/tasks', element: <PrivateRoute><TaskPage /></PrivateRoute> }
  ]);

  return (
    <UserProvider>
      <NavBar />

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(prev => !prev)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          padding: "8px 12px",
          backgroundColor: darkMode ? "#333" : "#ddd",
          color: darkMode ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {routes}
    </UserProvider>
  );
}

export default App;
