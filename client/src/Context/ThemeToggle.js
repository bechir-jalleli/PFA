// src/Context/ThemeToggle.js
import React, { useContext } from 'react';
import { Switch } from 'antd'; // Import the Switch component from Ant Design
import { ThemeContext } from './ThemeContext'; // Ensure this path is correct

const ThemeToggle = ({ style }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ display: 'flex', alignItems: 'center', ...style }}>
      <span style={{ marginRight: '15px' }}>
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </div>
  );
};

export default ThemeToggle;
