import React from 'react';
import { Typography, Space, Row, Col, Card } from 'antd';
import { AlertOutlined, ProjectOutlined, WarningOutlined } from '@ant-design/icons';
import ReadRisques from './ReadRisques';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: clamp(1rem, 3vw, 2rem);
  min-height: 100vh;
  transition: all 0.3s ease;
`;

const GlassCard = styled(Card)`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.03)' : 
    'rgba(255, 255, 255, 0.65)'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .ant-statistic-title {
    color: ${props => props.isDarkMode ? '#ffffff80' : '#00000080'};
  }

  .ant-statistic-content {
    color: ${props => props.isDarkMode ? '#fff' : '#000'};
  }
`;

const RisquesDashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <DashboardContainer>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <GlassCard isDarkMode={isDarkMode}>
            <Card.Meta
              avatar={<AlertOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />}
              title="Total Risks"
              description="15"
            />
          </GlassCard>
        </Col>
        <Col xs={24} sm={8}>
          <GlassCard isDarkMode={isDarkMode}>
            <Card.Meta
              avatar={<WarningOutlined style={{ fontSize: '24px', color: '#faad14' }} />}
              title="High Priority"
              description="5"
            />
          </GlassCard>
        </Col>
        <Col xs={24} sm={8}>
          <GlassCard isDarkMode={isDarkMode}>
            <Card.Meta
              avatar={<ProjectOutlined style={{ fontSize: '24px', color: '#52c41a' }} />}
              title="Projects with Risks"
              description="8"
            />
          </GlassCard>
        </Col>
      </Row>

      <GlassCard isDarkMode={isDarkMode} style={{ marginTop: '24px' }}>
        <ReadRisques />
      </GlassCard>
    </DashboardContainer>
  );
};

export default RisquesDashboard;
