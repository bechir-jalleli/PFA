// src/components/ThemeToggle.js
import React from 'react';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren={<BulbOutlined />}
      unCheckedChildren={<BulbFilled />}
    />
  );
};

export default React.memo(ThemeToggle);
