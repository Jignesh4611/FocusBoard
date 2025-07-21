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
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
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
      <div className="app-container">
        <NavBar />

        <button
          className="theme-toggle-button"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {routes}
      </div>
    </UserProvider>
  );
}

export default App;
