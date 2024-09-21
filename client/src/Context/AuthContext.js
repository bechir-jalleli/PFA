import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { accessToken, id, role } = response.data;

      console.log('Login response data:', response.data);

      if (!accessToken || !id || !role) {
        throw new Error('Response data is not complete');
      }

      localStorage.setItem('user', JSON.stringify({ id, role }));
      localStorage.setItem('accessToken', accessToken);

      setUser({ id, role });
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error.response ? new Error(error.response.data.error) : new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const hasRole = (requiredRole) => user?.role === requiredRole;

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasRole }}>
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
