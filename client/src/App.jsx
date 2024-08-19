import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';

import Products from './pages/ProductPages/ProductListPage';
import ProductDetails from './pages/ProductPages/ProductDetailPage';

import Cart from './pages/UserPages/CartPage';
import Checkout from './pages/UserPages/CheckoutPage';

import ErrorPage from './pages/ErrorPage';

import UserProfilePage from './pages/UserPages/UserProfilePage';
import UserAddressPage from './pages/UserPages/UserAddressPage';
import UserOrder from './pages/UserPages/UserOrder';
import UserPayOptionPage from './pages/UserPages/UserPayOptionPage';

import WishlistPage from './pages/UserPages/WishlistPage';

import ProductControlPanelPage from './pages/VendorPage/VendorProduct/ProductControlPanelPage';
import OrderControlPanelPage from './pages/VendorPage/VendorOrder/OrderControlPanelPage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import AdminLogin from './pages/Auth/AdminLogin';
import AdminRegister from './pages/Auth/AdminRegister';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route path="register" element={<AdminRegister />} />
        </Route>
        

        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} /> 
        <Route path="/checkout" element={<Checkout />} />

        {/* User Pages */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<Cart />} />

        {/* User Dashboard */}
        <Route path="/user">
          <Route index element={<UserProfilePage />} />
          <Route path="address" element={<UserAddressPage />} />
          <Route path="payoption" element={<UserPayOptionPage />} />
          <Route path="orders" element={<UserOrder />} />  
        </Route>

        <Route path="/vendor">
          <Route path="products" element={<ProductControlPanelPage />} />
          <Route path="orders" element={<OrderControlPanelPage />} />
          {/* <Route index element={<UserProfilePage />} />
          <Route path="address" element={<UserAddressPage />} />
          <Route path="payoption" element={<UserPayOptionPage />} />
          <Route path="orders" element={<UserOrder />} />   */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
