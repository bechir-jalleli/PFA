// src/components/ThemeToggle.js
import React from 'react';
import { Switch, Tooltip } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from '../Context/ThemeContext';
import { css } from '@emotion/react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren={<BulbFilled style={{ color: '#007A33' }} />} // Emerald Green for checked
        unCheckedChildren={<BulbOutlined style={{ color: '#003366' }} />} // Deep Blue for unchecked
        style={css`
          background-color: ${isDarkMode ? '#1f1f1f' : '#F0F0F0'};
          border-color: ${isDarkMode ? '#007A33' : '#003366'};
          transition: background-color 0.3s, border-color 0.3s;
          // Responsive styles
          @media (max-width: 768px) {
            width: 100%;
            margin: 0 auto;
          }
        `}
      />
    </Tooltip>
  );
};

export default React.memo(ThemeToggle);
