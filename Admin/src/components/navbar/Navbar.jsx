import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navprofile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='nav-logo ' src={navlogo} alt="" />
      <img src={navprofile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar
