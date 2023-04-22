import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthProvider';

const PrivateRoute = ({ element: Component }) => {
  const { currentUser } = useAuth();
  let location = useLocation()

  return (

      currentUser ? <Component /> : <Navigate to="/login" state={{ from: location }} />
    
  );
};
export default PrivateRoute;
