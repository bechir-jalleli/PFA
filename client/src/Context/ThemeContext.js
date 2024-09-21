import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

const lightThemeColors = {
  primaryColor: '#003366', // Deep Blue
  secondaryColor: '#F0F0F0', // Light Gray
  accentColor: '#007A33', // Emerald Green
};

const darkThemeColors = {
  primaryColor: '#003366', // Deep Blue (use darker shades if needed)
  secondaryColor: '#1f1f1f', // Dark Gray
  accentColor: '#007A33', // Emerald Green
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setIsDarkMode(e.matches);

    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const themeConfig = {
    token: {
      colorPrimary: isDarkMode ? darkThemeColors.primaryColor : lightThemeColors.primaryColor,
      colorBgBase: isDarkMode ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
      colorLink: isDarkMode ? darkThemeColors.accentColor : lightThemeColors.accentColor,
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
