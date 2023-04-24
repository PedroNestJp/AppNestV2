import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AddProducts from '../pages/AddProducts';
import Header from '../components/Header';

function AppRoutes() {
  return (
    <Router>
      <Header/>
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/' element={<HomePage/>} />
            <Route path='/addProduct' element={<AddProducts/>}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes