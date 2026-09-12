import { Routes, Route } from 'react-router-dom'
import Home from './Homepage/Home.jsx'
import LoginPage from './LoginPage/LoginPage.jsx'
import CartPage from './CartPage/CartPage.jsx'
import ProfilePage from './ProfilePage/ProfilePage.jsx'
import MenuPage from './MenuPage/MenuPage.jsx'
// import FavoritesPage from './FavoritesPage/FavoritesPage.jsx'
import SignupPage from './SignupPage/SignupPage.jsx'
import { createContext, useState } from 'react'
import { FavoritesContext,  } from './context/FavoritesContext.jsx'



function App() {
  const {fav, setFav}=useState([]);
  
const t=1


  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      
    </>
  )
}

export default  App;
