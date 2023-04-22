import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthProvider';
import CartPage from '../pages/CartPage';

const PrivateRoute = ({ element: cartPage }) => {
  const { user } = useAuth();
  let location = useLocation()

  return (

      user ? <CartPage /> : <Navigate to="/login" state={{ from: location }} />
    
  );
};
export default PrivateRoute;
