import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  notification, Spin, Row, Col, Card, Typography, 
  Descriptions, Button, Statistic, Avatar, Layout, 
  Divider, Switch
} from 'antd';
import {
  UserOutlined, ProjectOutlined, 
  DollarOutlined, TeamOutlined, MailOutlined,
  PhoneOutlined, ClockCircleOutlined, BulbOutlined, 
  EyeOutlined, ArrowLeftOutlined
} from '@ant-design/icons';
import { useTheme } from '../../Context/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${props => props.isDarkMode ? '#1f1f1f' : '#f0f2f5'};
`;

const ThemeToggle = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const getThemeStyles = (isDarkMode) => ({
  // ... [Previous theme styles remain the same]
});

const StatsCard = ({ title, value, icon, suffix, isDarkMode }) => {
  const styles = getThemeStyles(isDarkMode);
  return (
    <StyledCard style={styles.statsCard} hoverable>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          background: isDarkMode ? '#3d3d3d' : '#E3F2FD',
          padding: '12px',
          borderRadius: '12px'
        }}>
          {React.cloneElement(icon, { 
            style: { 
              fontSize: '24px', 
              color: isDarkMode ? '#81b1ff' : '#2196F3' 
            }
          })}
        </div>
        <div>
          <Text style={styles.statTitle}>{title}</Text>
          <Title level={3} style={{ ...styles.statValue, margin: '4px 0' }}>
            {value}{suffix}
          </Title>
        </div>
      </div>
    </StyledCard>
  );
};

const ResponsableCard = ({ responsable, onViewProfile, isDarkMode }) => {
  const styles = getThemeStyles(isDarkMode);
  return (
    <StyledCard style={styles.responsableCard} hoverable>
      {/* ... [Previous ResponsableCard content remains the same] */}
    </StyledCard>
  );
};

const OrganisationDetail = () => {
  const [organisation, setOrganisation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getThemeStyles(isDarkMode);

  useEffect(() => {
    const fetchOrganisationDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/organisations/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setOrganisation(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.response?.data?.message || 'Failed to fetch organisation details',
        });
        navigate('/organisations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisationDetail();
  }, [id, navigate]);

  const handleBack = () => navigate(-1);
  const handleResponsableClick = () => {
    navigate(`/responsables/info/${organisation.responsable._id}`);
  };

  if (loading) {
    return <LoadingContainer isDarkMode={isDarkMode}><Spin size="large" /></LoadingContainer>;
  }

  return (
    <Layout style={styles.pageContainer}>
      <ThemeToggle>
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
        />
      </ThemeToggle>

      <BackButton type="primary" onClick={handleBack} icon={<ArrowLeftOutlined />}>
        Back
      </BackButton>

      <Content style={{ maxWidth: 1400, margin: '0 auto' }}>
        {organisation && (
          <Row gutter={[24, 24]}>
            {/* ... [Previous content structure remains the same] */}
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default OrganisationDetail;
