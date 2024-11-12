import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './SideBar';
import Header from './Header';
import { useTheme } from '../Context/ThemeContext';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const { Content } = Layout;

// Global animations and styles
const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const ModernLayout = styled(Layout)`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
`;

const Shape = styled.div`
  position: absolute;
  opacity: 0.1;
  background: linear-gradient(45deg, 
    ${props => props.isDarkMode ? '#1890ff' : '#69c0ff'},
    ${props => props.isDarkMode ? '#36cfc9' : '#95de64'}
  );
`;

const Circle = styled(Shape)`
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s infinite ease-in-out ${props => props.reverse ? 'reverse' : ''};
`;

const Square = styled(Shape)`
  transform: rotate(45deg);
  animation: ${rotate} ${props => props.duration}s infinite linear ${props => props.reverse ? 'reverse' : ''};
`;

const SiteLayout = styled(Layout)`
  margin-left: ${props => props.collapsed ? '80px' : '250px'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;

  @media (max-width: 768px) {
    margin-left: ${props => props.collapsed ? '0' : '80px'};
  }
`;

const ContentContainer = styled(Content)`
  margin: 80px 0px 24px;
  padding: 24px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 64px 0px 12px;
    padding: 12px;
  }
`;

const ContentWrapper = styled.div`
  background: ${props => props.isDarkMode ? 
    'rgba(20, 20, 20, 0.8)' : 
    'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  min-height: calc(100vh - 180px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
`;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <ModernLayout>
      <GlobalStyle />
      
      <AnimatedBackground>
        <Circle 
          isDarkMode={isDarkMode}
          style={{ width: '400px', height: '400px', top: '-100px', right: '-100px' }}
          duration={15}
        />
        <Circle 
          isDarkMode={isDarkMode}
          style={{ width: '300px', height: '300px', bottom: '-50px', left: '-50px' }}
          duration={20}
          reverse
        />
        <Square 
          isDarkMode={isDarkMode}
          style={{ width: '200px', height: '200px', top: '30%', right: '15%' }}
          duration={25}
        />
        <Square 
          isDarkMode={isDarkMode}
          style={{ width: '150px', height: '150px', bottom: '20%', left: '20%' }}
          duration={20}
          reverse
        />
      </AnimatedBackground>

      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      
      <SiteLayout collapsed={collapsed}>
        <Header collapsed={collapsed} onCollapse={setCollapsed} />
        <ContentContainer>
          <ContentWrapper isDarkMode={isDarkMode}>
            {children}
          </ContentWrapper>
        </ContentContainer>
      </SiteLayout>
    </ModernLayout>
  );
};

export default MainLayout;
