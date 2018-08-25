import React from 'react'
import {NavLink as Link } from 'react-router-dom';


const liButton = {
  background: '#8aa',
  borderRadius:'5px',
  display:'block',
  textAlign:'center',
  padding:'8px',
  fontSize:'16px',
  color:'#fff',
  width:'100%',
  textWrap:'none'
}

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link style={liButton} to='/'>Home Page</Link></li>
        <li><Link style={liButton} to='/roster'>Music163&nbsp;demo</Link></li>
        <li><Link style={liButton} to='/schedule'>On Hold</Link></li>
        <li><Link style={liButton} to='/Counter'>Counter</Link></li>
        <li><Link style={liButton} to='/Todo'>TodoList</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header