import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthProvider';

const PrivateRoute = ({ element: Component }) => {
  const { currentUser } = useAuth();

  return (
      currentUser ? <Component /> : <Navigate to="/login" />
    
  );
};

export default PrivateRoute;
