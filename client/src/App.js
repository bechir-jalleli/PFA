import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { ThemeProvider, useTheme } from './Context/ThemeContext';
import Header from './layouts/Header';
import AppRoutes from './routes/AppRoutes'; // Import the AppRoutes component
import Sidebar from './layouts/SideBar';
import NavBar from './layouts/NavBar';

function App() {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : ''; // Toggle dark class
  }, [isDarkMode]);

  return (
    <Router>
      <Header />
      <NavBar /> 
      <Sidebar />
      <AppRoutes /> {/* Use the AppRoutes component */}
    </Router>
  );
}

export default () => (
  <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthProvider>
);
