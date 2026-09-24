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

    function cartqty(id ,op){
      if(op === "add"){
        const updatedCartItems = cartItems.map((item) => item.id === id?{ ...item, qty: item.qty + 1 } : {...item, qty: 1})
        localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
        setCart(updatedCartItems)
      }else{
        const updatedCartItems = cartItems.map((item) => item.id === id? item.qty === 1 ? { ...item, qty: 0} : {...item, qty: item.qty - 1 } : {...item, qty: 1})
        const filteredCartItems = updatedCartItems.filter((item) => item.qty > 0)
        localStorage.setItem('Cart', JSON.stringify(filteredCartItems))
        setCart(filteredCartItems)
      }
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
    <CartContext.Provider value={{ cart, addItemtocart, clearCart, cartqty , remove }}>

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
