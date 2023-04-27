import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './pages/contexts/AuthProvider';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage2';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/NavBar';
import ProfilePage from './pages/ProfilePage';
import AddProductPage from './pages/admin/AddProducts';
import AdminPage from './pages/admin/AdminPage';
import Footer from './components/Footer';
import { auth } from './firebase';
import ProductEx from './pages/ProductEx';

const CurrentUser = auth.currentUser 

const App = () => {
  
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/productEx" element={<ProductEx />} />
          {CurrentUser && CurrentUser.uid === process.env.REACT_APP_USER_ADMIN && (
            <>
            <Route path='/cart' element={<CartPage />} />
              <Route path="/addProduct" element={<AddProductPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </>
          )}
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default App;
