import { createContext, useContext ,useState} from "react";
import React from 'react'

const CartContext = createContext(null);




function CartProvider({children}) {
  const [cart, setCart] =useState(JSON.parse(localStorage.getItem('Cart') || '[]'));
  const storedCart = cart
  const cartItems = Array.isArray(storedCart) ? storedCart : [storedCart]




   function addItemtocart(dish){
      if(cartItems.length === 0){
        localStorage.setItem('Cart', JSON.stringify([{  ...dish, incart:true , qty:1 }]))
        setCart([ {...dish, incart:true , qty:1}])
      }else if(cartItems.length === 1){
        if(cartItems[0].id === dish.id){
          localStorage.setItem('Cart', JSON.stringify([]))
          setCart([])
        }else{
          const newCartItems = [...cartItems, {...dish, incart:true ,qty:1}]
          localStorage.setItem('Cart', JSON.stringify(newCartItems))
          setCart(prev => [...prev, {...dish, incart:true, qty:1}])
        }
      }else{
        if(cartItems.some((item) => item.id === dish.id)){
          const updatedCartItems = cartItems.filter((item) => item.id != dish.id)
          localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
          setCart(updatedCartItems)
        }else{
          const newCartItems = [...cartItems, {...dish, incart:true, qty:1}]
          localStorage.setItem('Cart', JSON.stringify(newCartItems))
          setCart(newCartItems)
        }
      }
    }

    function addToCartWithQty(dish, qty) {
      const found = cartItems.find((item) => item.id === dish.id)
      let updatedCartItems

      if (found) {
          updatedCartItems = cartItems.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + qty } : item)
        } else {
       updatedCartItems = [...cartItems, { ...dish, incart: true, qty: qty }]
       }

       localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
      setCart(updatedCartItems)
    }

    function cartqty(id, op) {
        let updatedCartItems

        if (op === "add") {
             updatedCartItems = cartItems.map((item) =>
             item.id === id ? { ...item, qty: item.qty + 1 } : item)
            } else {
             updatedCartItems = cartItems.map((item) =>
             item.id === id ? { ...item, qty: item.qty - 1 } : item)
          }

          const filteredCartItems = updatedCartItems.filter((item) => item.qty > 0)

          localStorage.setItem('Cart', JSON.stringify(filteredCartItems))
          setCart(filteredCartItems)
          }
          
    function remove(id){
      const updatedCartItems = cartItems.filter((item) => item.id != id)
      localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
      setCart(updatedCartItems)
    }
  function clearCart() {
    setCart([]);
    localStorage.removeItem('Cart');
  };


  return (
    <CartContext.Provider value={{ cart, addItemtocart, clearCart, cartqty , remove , addToCartWithQty }}>

      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export function useCart() {
  return useContext(CartContext);
}

