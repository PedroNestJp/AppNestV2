import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from '../pages/contexts/AuthProvider';
import HomePage from '../pages/home/HomePage';
import ProductDetailsPage from '../pages/products/ProductDetailsPage';
import CartPage from '../pages/CartPage2';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProductList from '../pages/admin/AddProducts';
import AdminPage from '../pages/admin/AdminPage';
import {Footer, SubFooter} from '../components/Footer';
import FavoritesPage from '../pages/Favorites';
import AddImage from '../pages/admin/AddImage';
import { ContactLine2 } from '../components/ContactLines';
import AboutUs from '../pages/home/footer/AboutUs';
import Terms from '../pages/home/footer/Terms';
import ResetPassword from '../pages/ResePassword';
import UserProfile from '../pages/UserProfile';
import GamingPcsPage from '../pages/products/GamingPcsPage';
import OfficePcsPage from '../pages/products/OfficePCsPage';
import HighEndPcsPage from '../pages/products/HighEndPcsPage';
import PeripheralsPage from '../pages/products/PeripheralsPage';
import MonitorsPage from '../pages/products/MonitorsPage';
import AllPcsPage from '../pages/products/AllPcsPage';
import SearchResults from '../pages/SearchResults';
import FilterByPlatformAmd from '../pages/products/FilterByPlatformAmd';
import FilterByPlatformIntel from '../pages/products/FilterByPlatformIntel';
import BudgetBuilder from '../pages/BudgetBuilder';

function EdnPoints() {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products/:id" element={<ProductDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/aboutUs' element={<AboutUs />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/resetPassword' element={<ResetPassword/>}/>
                    <Route path='/userProfile' element={<UserProfile/>}/>
                    <Route path='/gamingPcsPage' element={<GamingPcsPage/>}/>
                    <Route path='/officePcsPage' element={<OfficePcsPage/>}/>
                    <Route path='/peripheralsPage' element={<PeripheralsPage/>}/>
                    <Route path='/monitorsPage' element={<MonitorsPage/>}/>
                    <Route path='/highEndPcsPage' element={<HighEndPcsPage/>}/>
                    <Route path='/allPcsPage' element={<AllPcsPage/>}/>
                    <Route path='/filterByPlatformAmd' element={<FilterByPlatformAmd/>}/>
                    <Route path='/filterByPlatformIntel' element={<FilterByPlatformIntel/>}/>
                    <Route path='/searchResults' element={<SearchResults/>}/>
                    <Route path='/budgetBuilder' element={<BudgetBuilder/>}/>

                    <Route path="/addProducts" element={<ProductList />} />
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


