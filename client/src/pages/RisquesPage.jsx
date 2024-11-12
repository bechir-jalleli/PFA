import React from 'react';
import { Space } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #2196F3, #00BCD4);
    border-radius: 4px;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const ResponsableContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: transparent;
  color: ${props => props.isDarkMode ? '#ffffff' : '#2c3e50'};
  transition: background 0.3s ease;
`;

const GlassCard = styled.div`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.05)' : 
    'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FloatingShape = styled.div`
  position: absolute;
  background: linear-gradient(45deg, ${props => props.color1}, ${props => props.color2});
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  opacity: 0.5;
  z-index: 0;
  filter: blur(3px);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  animation: fadeIn 0.5s ease-in;
`;

const GradientText = styled.h1`
  background: linear-gradient(45deg, #2196F3, #00BCD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const RisquesPage = () => {
  const { isDarkMode } = useTheme();

  const shapes = [
    { size: '100px', top: '10%', left: '10%', color1: '#2196F3', color2: '#00BCD4', delay: '0s' },
    { size: '150px', top: '60%', right: '10%', color1: '#00BCD4', color2: '#4CAF50', delay: '2s' },
    { size: '80px', bottom: '10%', left: '20%', color1: '#4CAF50', color2: '#2196F3', delay: '4s' },
    { size: '120px', top: '30%', right: '25%', color1: '#2196F3', color2: '#00BCD4', delay: '1s' },
  ];

  return (
    <MainLayout>
      <GlobalStyle />
      <ResponsableContainer isDarkMode={isDarkMode}>
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              animationDelay: shape.delay,
            }}
            color1={shape.color1}
            color2={shape.color2}
          />
        ))}

        <ContentWrapper>
          <GlassCard isDarkMode={isDarkMode} style={{ padding: '2rem', margin: '0 0 2rem 0' }}>
            <Space align="center" style={{ width: '100%', justifyContent: 'center', margin: 0 }}>
              <AlertOutlined style={{ fontSize: '48px', color: '#2196F3' }} />
              <GradientText style={{ margin: 0, fontSize: '2rem' }}>Risk Management</GradientText>
            </Space>
          </GlassCard>
          <GlassCard isDarkMode={isDarkMode}>
            <Outlet />
          </GlassCard>
        </ContentWrapper>
      </ResponsableContainer>
    </MainLayout>
  );
};

export default RisquesPage;
