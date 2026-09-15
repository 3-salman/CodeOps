import { createContext, useContext } from "react";


// import React from 'react'

// function useCartContext() {
//     const cartContext=createContext(
//     JSON.parse(localStorage.getItem("Cart")))

//   return useContext(cartContext)
// }

// export default useCartContext

export const CartContext=createContext(JSON.parse(localStorage.getItem("Cart"))
);

// cart=JSON.parse(localStorage.getItem("Cart"))
// export  const CartContext=createContext({
//         cart:cart,
//         count:cart.length
  
//     }
// );

// export const useCart=useContext(CartContext)


// console.log(useContext(CartContext))

































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
