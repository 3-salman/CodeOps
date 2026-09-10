import React from 'react'
import { useTheme } from '../context/ThemeContext'

function ThemeBadge() {
  const { theme, toggleTheme } = useTheme()
  return (
   <div></div>
  )
}

function Header() {
  return (
    <div className='header'>
      <h1>Addis Eats</h1>
      <ThemeBadge />
    </div>
  )
}

export default Header
