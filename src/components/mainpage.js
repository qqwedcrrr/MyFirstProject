import React from 'react'
import {NavLink as Link } from 'react-router-dom';


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home Page</Link></li>
        <li><Link to='/roster'>Music163 demo</Link></li>
        <li><Link to='/schedule'>On Hold</Link></li>
        <li><Link to='/Counter'>Counter</Link></li>
        <li><Link to='/Todo'>TodoList</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header