import { Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './HomePage/Home.jsx'
import LoginPage from './LoginPage/LoginPage.jsx'
import CartPage from './CartPage/CartPage.jsx'
import CheckoutPage from './CheckoutPage/CheckoutPage.jsx'
import ProfilePage from './ProfilePage/ProfilePage.jsx'
import MenuPage from './MenuPage/MenuPage.jsx'
import DishDetailPage from './MenuPage/DishDetailPage.jsx'
import FavoritesPage from './FavoritesPage/FavoritesPage.jsx'
import SignupPage from './SignupPage/SignupPage.jsx'
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx'
import RequireAuth from './auth/RequireAuth.jsx'



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<DishDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App