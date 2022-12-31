import React from 'react'
import { Route, Routes } from 'react-router'
import { Homepage } from '../Pages/Homepage'
import { Login } from '../Pages/Login'
import { Signup } from '../Pages/Signup'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/auth/register" element={<Signup />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
    </Routes>
  )
}