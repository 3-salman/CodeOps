import { createContext, useContext ,useState} from "react";
import React from 'react'

const CartContext = createContext(null);




function CartProvider({children}) {
  const [cart, setCart] =useState(JSON.parse(localStorage.getItem('Cart') || '[]'));





   function addItemtocart(dish){
      const storedCart = cart
      const cartItems = Array.isArray(storedCart) ? storedCart : [storedCart]

      if(cartItems.length === 0){
        // const newCartItems = [...cartItems, {...cart, incart:true}]
        localStorage.setItem('Cart', JSON.stringify([{  ...dish, incart:true}]))
        setCart([ {...dish, incart:true}])
      }else if(cartItems.length === 1){
        if(cartItems[0].id === dish.id){
          localStorage.setItem('Cart', JSON.stringify([]))
          setCart([])
        }else{
          const newCartItems = [...cartItems, {...dish, incart:true}]
          localStorage.setItem('Cart', JSON.stringify(newCartItems))
          setCart(prev => [...prev, {...dish, incart:true}])
        }
      }else{
        if(cartItems.some((item) => item.id === dish.id)){
          const updatedCartItems = cartItems.filter((item) => item.id != dish.id)
          localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
          setCart(updatedCartItems)
        }else{
          const newCartItems = [...cartItems, {...dish, incart:true}]
          localStorage.setItem('Cart', JSON.stringify(newCartItems))
          setCart(newCartItems)
        }
      }
    }

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('Cart');
  };


  return (
    <CartContext.Provider value={{ cart, addItemtocart, clearCart }}>

      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export function useCart() {
  return useContext(CartContext);
}






// const cart_state= localStorage.getItem("Cart") ? JSON.parse( localStorage.getItem("Cart")) : null
// console.log(cart_state)

//   export const CartContext=createContext(cart_state);


































// import { createContext, useContext, useState, useMemo } from 'react'

// const CartContext = createContext(null)

// export function CartProvider({ children }) {
//   const [items, setItems] = useState([])

//   const addItem = (dish) => {
//     setItems((prev) => {
//       const found = prev.find((i) => i.id === dish.id)
//       if (found) {
//         return prev.map((i) =>
//           i.id === dish.id ? { ...i, qty: i.qty + 1 } : i
//         )
//       }
//       return [...prev, { id: dish.id, title: dish.title, price: dish.price, qty: 1 }]
//     })
//   }

//   const removeItem = (id) =>
//     setItems((prev) => prev.filter((i) => i.id !== id))

//   const clear = () => setItems([])

//   const value = useMemo(() => {
//     const count = items.reduce((n, i) => n + i.qty, 0)
//     const total = items.reduce((s, i) => s + i.qty * i.price, 0)
//     return { items, count, total, addItem, removeItem, clear }
//   }, [items])

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }

// export function useCart() {
//   const ctx = useContext(CartContext)
//   if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
//   return ctx
// }
