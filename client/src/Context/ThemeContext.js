import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

const lightThemeColors = {
  primaryColor: '#2196F3',
  secondaryColor: '#ffffff',
  accentColor: '#00BCD4',
  gradientStart: '#f5f7fa',
  gradientEnd: '#c3cfe2',
  textColor: '#2c3e50',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '20px',
  inputBackground: '#ffffff',
  buttonGradientStart: '#2196F3',
  buttonGradientEnd: '#00BCD4',
  cardBackground: '#f8fafc',
};

const darkThemeColors = {
  primaryColor: '#2196F3',
  secondaryColor: '#141414',
  accentColor: '#00BCD4',
  gradientStart: '#001529',
  gradientEnd: '#002140',
  textColor: '#ffffff',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '20px',
  inputBackground: '#1f1f1f',
  buttonGradientStart: '#2196F3',
  buttonGradientEnd: '#00BCD4',
  cardBackground: '#1f1f1f',
};

// Responsive font sizes based on viewport width
const getFontSizes = () => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
  if (vw >= 1200) { // Desktop
    return {
      fontSize: 16,
      h1: 40,
      h2: 32,
      h3: 28,
      h4: 24,
    };
  } else if (vw >= 768) { // Tablet
    return {
      fontSize: 15,
      h1: 36,
      h2: 28,
      h3: 24,
      h4: 20,
    };
  } else { // Mobile
    return {
      fontSize: 14,
      h1: 32,
      h2: 24,
      h3: 20,
      h4: 18,
    };
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [fontSizes, setFontSizes] = useState(getFontSizes());

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setIsDarkMode(e.matches);

    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setFontSizes(getFontSizes());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const currentColors = isDarkMode ? darkThemeColors : lightThemeColors;

  const themeConfig = {
    token: {
      colorPrimary: currentColors.primaryColor,
      colorBgBase: currentColors.secondaryColor,
      colorLink: currentColors.accentColor,
      borderRadius: 8,
      colorText: currentColors.textColor,
      colorBgContainer: currentColors.cardBackground,
      boxShadow: `0 8px 32px ${currentColors.shadowColor}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      fontSize: fontSizes.fontSize,
      fontSizeHeading1: fontSizes.h1,
      fontSizeHeading2: fontSizes.h2,
      fontSizeHeading3: fontSizes.h3,
      fontSizeHeading4: fontSizes.h4,
    },
    components: {
      Button: {
        borderRadius: 8,
      },
      Input: {
        borderRadius: 8,
        controlHeight: 48,
      },
      Card: {
        borderRadius: 20,
      },
      Typography: {
        titleMarginBottom: 0,
        titleMarginTop: 0,
      },
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  const themeContextValue = {
    isDarkMode,
    toggleTheme,
    colors: currentColors,
    fontSizes,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
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
