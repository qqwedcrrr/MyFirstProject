import React from 'react'
import {NavLink as Link } from 'react-router-dom';


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
        <li><Link to='/Counter'>Counter</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header