import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Users from "./Users"
import Posts from "./Posts"
const Home = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Users/>}/>
            <Route path="/posts" element={<Posts/>}/>
        </Routes>
    </div>
  )
}

export default Home