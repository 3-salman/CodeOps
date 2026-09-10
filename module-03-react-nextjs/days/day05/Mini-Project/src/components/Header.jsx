import React from 'react'
import CartBadge from './CartBadge'

function Header() {
  return (
    <div className='header'>
      <h1>Addis Eats</h1>
      <CartBadge />
    </div>
  )
}

export default Header
