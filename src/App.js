import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './pages/contexts/AuthProvider';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NavBar from './components/NavBar'
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage'
import CartProvider from './pages/contexts/CartProvider';


const App = () => {
  return (
    <Router>
      <CartProvider>
      <Routes>
      </Routes>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute />
            }>
              <Route
                path='/cart'
                element={<CartPage />}
              />
          </Route>
        </Routes>
      </AuthProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
