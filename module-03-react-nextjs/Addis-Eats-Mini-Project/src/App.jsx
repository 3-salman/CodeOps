import { Routes, Route } from 'react-router-dom'
import Home from './Homepage/Home.jsx'
import LoginPage from './LoginPage/LoginPage.jsx'
import CartPage from './CartPage/CartPage.jsx'
import ProfilePage from './ProfilePage/ProfilePage.jsx'
import MenuPage from './MenuPage/MenuPage.jsx'
import DetailMenu from './MenuPage/DishDetailPage.jsx'
import Test from './MenuPage/test.jsx'
import FavoritesPage from './FavoritesPage/FavoritesPage.jsx'
import SignupPage from './SignupPage/SignupPage.jsx'




function App() {

  return (
    <>
      <main>
        {/* <Routes>  //which children have to execute */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menudetail" element={<Test />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      
    </>
  )
}

export default  App;
