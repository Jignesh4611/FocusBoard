import React from 'react'
import { Link,Outlet } from 'react-router-dom'


const DashBoardLayout = () => {
  return (
    <>
    <div>
    <h3>DashBoard</h3>
    </div>
    <nav>
        <Link to="/dashboard" >Home</Link> |{" "}
        <Link to="/dashboard/profile" >Profile</Link> |{" "}
        <Link to="/dashboard/Setting" >Setting</Link>
    </nav>
    <hr/>
    <Outlet/>
    </>
  )
}

export default DashBoardLayout
