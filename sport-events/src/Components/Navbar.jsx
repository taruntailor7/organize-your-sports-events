import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux"

export const Navbar = () => {

  const {token} = useSelector((state)=>state)
  
  
  return (
    <div className='navbar'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/auth/login">Login</NavLink>
    </div>
  )
}
