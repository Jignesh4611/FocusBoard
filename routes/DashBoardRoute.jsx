import React from 'react'
import Profile from '../Components/Profile'
import Setting from '../Components/Setting'
import DashBoardLayout from '../Components/DashBoardLayout'
import DashBaord from '../Components/DashBaord'
import DashboardHome from '../Components/DashboardHome'

const DashBoardRoute = {
  path: "/dashboard",
  element: <DashBoardLayout />,
  children: [ // ✅ use lowercase
    {
      index: true, // renders DashBaord at /dashboard
      element: <DashBaord />
    },
    {
      path: "dashhome", // or rename to "home" if preferred
      element: <DashboardHome />
    },
    {
      path: "profile",
      element: <Profile />
    },
    {
      path: "setting",
      element: <Setting />
    }
  ]
}

export default DashBoardRoute
