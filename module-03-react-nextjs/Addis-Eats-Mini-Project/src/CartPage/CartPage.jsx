import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import  {useCart}  from '../context/CartProvider'
import { Link } from 'react-router-dom'
import CartCard from './CartCard'
// import { useContext } from 'react'
// import { useState } from 'react'

const items = [
  {
    id: 1,
    name: 'Doro Wat',
    desc: 'Slow-braised chicken in berbere sauce',
    price: 14.5,
    qty: 2,
    emoji: '🍛',
    c1: '#C73E1D',
    c2: '#7A1F0A',
  },
  {
    id: 2,
    name: 'Shiro',
    desc: 'Spiced chickpea stew, served with injera',
    price: 11.0,
    qty: 1,
    emoji: '🥘',
    c1: '#E5A50A',
    c2: '#9C2F15',
  },
  {
    id: 3,
    name: 'Tibs Platter',
    desc: 'Pan-seared beef with onions and peppers',
    price: 16.0,
    qty: 1,
    emoji: '🍲',
    c1: '#3F5A21',
    c2: '#7A1F0A',
  },
]

const DELIVERY_FEE = 3.5
const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
const total = subtotal + DELIVERY_FEE

function CartPage() {
  
  const [cart , setCart] = useState(useCart()) //useCartContext() //useState(useContext(CartContext))


  function addorsubtotal(op , id){
      op == "add"?
        setCart(
          cart.map(
            item =>item.id == id ? {...item , qty:item.qty + 1 } : item
          )
      ):
      setCart(
          cart.map(
            item =>item.id == id ? item.qty == 1 ? item :{...item , qty:item.qty - 1 } : item
          )
      )
        console.log(cart)
        console.log("first")

        localStorage.setItem( "Cart" ,JSON.stringify(cart))
  }

  function remove(id){
          setCart(
            cart.filter(
              item => item.id == id ? false : true 
            )
          )
  }


  return (

    <div>
      <Navbar/>
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <p className="eyebrow">Your Order</p>
          <h1 className="section-title">
            Ready to <em>checkout</em>?
          </h1>
        </div>

        
          
            <div className="cart-page-layout">
           <div className="cart-page-items"></div>
            {Array.isArray(cart)? cart.map((item) => (
                <CartCard key={item.id} item={item} addorsubtotal={addorsubtotal} remove={remove}/>
            )):
              cart? <CartCard key={cart.id} item={cart} addorsubtotal={addorsubtotal} remove={remove}/>
              : <h1> empty cart</h1>
            }
            
            </div>

          {cart && 
          <aside className="cart-page-summary">
            <h3 className="cart-page-summary__title">Order Summary</h3>

            <div className="cart-page-summary__row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-page-summary__row">
              <span>Delivery fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>

            <div className="cart-page-summary__divider" />

            <div className="cart-page-summary__row cart-page-summary__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button type="button" className="btn btn--primary btn--lg cart-page-checkout">
              Proceed to Checkout
            </button>

            <Link to="/menu" className="link-arrow cart-page-continue">
              ← Continue shopping
            </Link>
          </aside>}
            

        </div>
      </div>
    </div>
    
  )
}

export default CartPage