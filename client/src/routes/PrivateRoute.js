// src/routes/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const { isAuthenticated, userRoles } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && Array.isArray(userRoles) && !allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default PrivateRoute;
