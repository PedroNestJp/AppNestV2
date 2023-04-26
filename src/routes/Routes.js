import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AddProducts from '../pages/admin/AddProducts';
import Header from '../components/Header';
import GetProducts from '../components/GetProducts';
import AdminPage from '../pages/admin/AdminPage';
import ProfilePage from '../pages/ProfilePage';

function AppRoutes() {
  return (
    <Router>
      <Header/>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/products' element={<GetProducts/>} />
            <Route path='/addProduct' element={<AddProducts/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes