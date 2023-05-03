import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from '../pages/contexts/AuthProvider';
import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage2';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import Navbar from '../components/Header';
import ProfilePage from '../pages/ProfilePage';
import AddProductPage from '../pages/admin/AddProducts';
import AdminPage from '../pages/admin/AdminPage';
import Product from '../pages/ProductEx';
import {Footer, SubFooter} from '../components/Footer';
import CRUDProducts from '../pages/admin/CRUD.Products';
import FavoritesPage from '../pages/Favorites';
import AddImage from '../pages/admin/AddImage';
import { ContactLine1, ContactLine2 } from '../components/ContactLines';
import AdsHeader from '../components/AdsHeader';
import AboutUs from '../pages/AboutUs';
import Terms from '../pages/Terms';
import Carrosel from '../components/Carrosel';

function EdnPoints() {
    return (
        <div>
            <AuthProvider>
                <Navbar />
                <ContactLine1/>
                <AdsHeader/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/products/:id" element={<ProductDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/product" element={<Product />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/aboutUs' element={<AboutUs />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/carrosel' element={<Carrosel/>}/>

                    <Route path="/addProducts" element={<AddProductPage />} />
                    <Route path="/CRUDProducts" element={<CRUDProducts />} />
                    <Route path="/addImage" element={<AddImage />} />
                    <Route path="/admin" element={<AdminPage />} />

                </Routes>
                <ContactLine2/>
                <Footer />
                <SubFooter/>
            </AuthProvider>
        </div>
    )
}

export default EdnPoints


