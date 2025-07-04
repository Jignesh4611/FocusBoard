import React, { Children } from 'react'
import Profile from '../Components/Profile'
import Setting from '../Components/Setting'
import DashBoardLayout from '../Components/DashBoardLayout'
import DashBaord from '../Components/DashBaord'

const DashBoardRoute =  {
  path : "/dashboard",
  element :<DashBoardLayout />,
  Children :[
   {  index: true, // 👉 this renders DashBaord at /dashboard
      element: <DashBaord />},
    { path: "home", element: <DashBaord /> },
    { path: "profile", element: <Profile /> },
    { path: "setting", element: <Setting /> },
  ]
}

export default DashBoardRoute
