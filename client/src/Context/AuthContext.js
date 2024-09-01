// src/Context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status on component mount
  const checkAuthStatus = () => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUser = localStorage.getItem('user');
    if (storedIsAuthenticated && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  };

  // Login function
  const login = async (email, mdp) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mdp }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
  
      const data = await response.json();
      console.log('Login response data:', data); // Debugging line
  
      const { accessToken, id, role } = data;
  
      if (!accessToken || !id || !role) {
        throw new Error('Incomplete response data');
      }
  
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ id, role }));
      localStorage.setItem('accessToken', accessToken);
  
      setUser({ id, role });
      setIsAuthenticated(true);
  
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };
  
  // Logout function remains unchanged
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };
  

  // Check if user has a specific role
  const hasRole = (requiredRole) => {
    if (user && user.role) {
      return user.role === requiredRole;
    }
    return false;
  };

  // Check if the user is authenticated
  const isLoggedIn = () => {
    return isAuthenticated;
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasRole, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
