import React from 'react';
import { ThemeProvider } from './styles/Context/ThemeContext';
import { AuthProvider } from './styles/Context/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
