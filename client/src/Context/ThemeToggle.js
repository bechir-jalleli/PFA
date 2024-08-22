import React from 'react';
import { Switch } from 'antd';
import { useTheme } from '../Context/ThemeContext';
import styled from 'styled-components';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeLabel = styled.span`
  margin-right: 8px;
  color: ${({ theme }) => theme.text.primary};
  transition: color 0.3s ease;
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const ThemeToggle = ({ style }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <ToggleContainer style={style}>
      <ThemeLabel theme={theme}>
        {isDarkMode ? 'Dark' : 'Light'}
      </ThemeLabel>
      <StyledSwitch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren={<Brightness4 style={{ fontSize: 16 }} />}
        unCheckedChildren={<Brightness7 style={{ fontSize: 16 }} />}
        theme={theme}
      />
    </ToggleContainer>
  );
};

export default React.memo(ThemeToggle);
