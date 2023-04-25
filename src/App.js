import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './pages/contexts/AuthProvider';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/NavBar';
import ProfilePage from './pages/ProfilePage';
import AddProductPage from './pages/admin/AddProducts';
import AdminPage from './pages/admin/AdminPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart">
              <Route path='/cart'
                      element={ 
                      <PrivateRoute> 
                          <CartPage />
                        </PrivateRoute>}>
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/addProduct" element={<AddProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AuthProvider>
      </React.Fragment>
      <Footer/>
    </Router>
  );
};

export default App;
