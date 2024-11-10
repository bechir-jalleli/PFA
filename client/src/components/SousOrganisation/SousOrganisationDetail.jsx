import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  notification, Spin, Row, Col, Card, Typography, 
  Descriptions, Button, Statistic, Avatar, Layout, Tag,
  Divider, Switch
} from 'antd';
import {
  UserOutlined, ProjectOutlined, TeamOutlined,
  DollarOutlined, BulbOutlined, EyeOutlined,
  MailOutlined, PhoneOutlined, BuildOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

const getThemeStyles = (isDarkMode) => ({
  pageContainer: {
    background: isDarkMode 
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    minHeight: '100vh',
    padding: '24px',
    transition: 'all 0.3s ease'
  },
  mainCard: {
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: isDarkMode 
      ? '0 8px 32px rgba(0,0,0,0.3)'
      : '0 8px 32px rgba(0,0,0,0.1)',
    border: 'none',
    background: isDarkMode ? '#2d2d2d' : '#ffffff',
    transition: 'all 0.3s ease',
  },
  gradientHeader: {
    background: isDarkMode
      ? 'linear-gradient(120deg, #1a1a1a 0%, #2d2d2d 100%)'
      : 'linear-gradient(120deg, #2196F3 0%, #1976D2 100%)',
    padding: '48px 32px',
    color: 'white',
    position: 'relative',
    borderRadius: '20px',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)'
  },
  statsCard: {
    height: '100%',
    borderRadius: '16px',
    border: 'none',
    boxShadow: isDarkMode 
      ? '0 4px 16px rgba(0,0,0,0.2)'
      : '0 4px 16px rgba(0,0,0,0.06)',
    background: isDarkMode ? '#2d2d2d' : '#ffffff',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },
  responsableCard: {
    background: isDarkMode ? '#2d2d2d' : '#ffffff',
    borderRadius: '20px',
    border: 'none',
    boxShadow: isDarkMode 
      ? '0 8px 32px rgba(0,0,0,0.3)'
      : '0 8px 32px rgba(33,150,243,0.1)',
    transition: 'all 0.3s ease'
  },
  actionButton: {
    marginTop:'12px',
    borderRadius: '12px',
    height: '48px',
    padding: '0 32px',
    background: isDarkMode ? '#81b1ff' : '#2196F3',
    border: 'none',
    boxShadow: `0 4px 16px ${isDarkMode ? 'rgba(129,177,255,0.3)' : 'rgba(33,150,243,0.3)'}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 20px ${isDarkMode ? 'rgba(129,177,255,0.4)' : 'rgba(33,150,243,0.4)'}`
    }
  },
  text: {
    color: isDarkMode ? '#ffffff' : '#000000'
  },
  statValue: {
    color: isDarkMode ? '#81b1ff' : '#1565C0',
    fontWeight: 700,
    fontSize: '24px'
  },
  statTitle: {
    color: isDarkMode ? '#b0bec5' : '#546E7A',
    fontSize: '14px',
    fontWeight: 500
  }
});

const StatsCard = ({ title, value, icon, suffix, isDarkMode }) => {
  const styles = getThemeStyles(isDarkMode);
  return (
    <Card style={styles.statsCard} hoverable>
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
    </Card>
  );
};

function SousOrganisationDetail() {
  const [sousOrganisation, setSousOrganisation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const styles = getThemeStyles(isDarkMode);

  useEffect(() => {
    const fetchSousOrganisationDetail = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/sous-organisations/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setSousOrganisation(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch sous-organisation details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSousOrganisationDetail();
  }, [id]);

  const handleResponsableClick = () => {
    navigate(`/responsables/info/${sousOrganisation.sousOrganisation.responsable._id}`);
  };

  const handleParentOrgClick = () => {
    navigate(`/organisations/info/${sousOrganisation.sousOrganisation.organisation._id}`);
  };

  if (loading) {
    return (
      <div style={{ 
        ...styles.pageContainer, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={styles.pageContainer}>
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          checked={isDarkMode}
          onChange={setIsDarkMode}
        />
      </div>

      <Content style={{ maxWidth: 1400, margin: '0 auto' }}>
        {sousOrganisation && (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card style={styles.mainCard}>
                <div style={styles.gradientHeader}>
                  <div style={styles.headerOverlay} />
                  <Row align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                      <Title level={2} style={{ color: 'white', margin: 0 }}>
                        {sousOrganisation.sousOrganisation.title}
                      </Title>
                      <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {sousOrganisation.sousOrganisation.description}
                      </Text>
                    </Col>
                    <Col xs={24} md={12}>
                      <Row justify="end">
                      <Button
  onClick={handleParentOrgClick}
  style={{
    border: '2px solid #1890ff',
    color: '#1890ff',
    borderRadius: '12px',
    padding: '8px 24px',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(24,144,255,0.3)'
    }
  }}
>
  View Parent Organization
</Button>

                      </Row>
                    </Col>
                  </Row>
                </div>

                <Row gutter={[24, 24]} style={{ padding: '24px' }}>
                  <Col xs={24} sm={8}>
                    <StatsCard
                      title="Chiffre d'Affaire"
                      value={sousOrganisation.sousOrganisation.chiffreAffaire}
                      suffix="€"
                      icon={<DollarOutlined />}
                      isDarkMode={isDarkMode}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <StatsCard
                      title="Total Projects"
                      value={sousOrganisation.nbProject}
                      icon={<ProjectOutlined />}
                      isDarkMode={isDarkMode}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <StatsCard
                      title="Total Employees"
                      value={sousOrganisation.nbTotalEmployees}
                      icon={<TeamOutlined />}
                      isDarkMode={isDarkMode}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card style={styles.responsableCard} hoverable>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <Avatar 
                    size={100} 
                    icon={<UserOutlined />} 
                    style={{
                      background: isDarkMode ? '#81b1ff' : '#2196F3',
                      marginBottom: '16px'
                    }}
                  />
                  <Title level={3} style={styles.text}>
                    {sousOrganisation.sousOrganisation.responsable.nom} {sousOrganisation.sousOrganisation.responsable.prenom}
                  </Title>
                  <Text type="secondary">Responsable</Text>
                </div>

                <Divider />

                <Descriptions column={1} size="small">
                  <Descriptions.Item label={<MailOutlined />} style={styles.text}>
                    {sousOrganisation.sousOrganisation.responsable.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={<PhoneOutlined />} style={styles.text}>
                    {sousOrganisation.sousOrganisation.responsable.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={<CalendarOutlined />} style={styles.text}>
                    Joined {new Date(sousOrganisation.sousOrganisation.responsable.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>

                <Button 
                  type="primary" 
                  block 
                  icon={<EyeOutlined />}
                  style={styles.actionButton}
                  onClick={handleResponsableClick}
                >
                  View Responsable Profile
                </Button>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card 
                title={<Title level={4} style={styles.text}>Parent Organisation</Title>}
                style={styles.mainCard}
              >
                <Descriptions 
                  bordered 
                  column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                  labelStyle={{ ...styles.text, fontWeight: 500 }}
                  contentStyle={styles.text}
                >
                  <Descriptions.Item label="Organisation Name">
                    {sousOrganisation.sousOrganisation.organisation.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {sousOrganisation.sousOrganisation.organisation.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Chiffre d'Affaire">
                    {sousOrganisation.sousOrganisation.organisation.chiffreAffaire}€
                  </Descriptions.Item>
                  <Descriptions.Item label="Created At">
                    {new Date(sousOrganisation.sousOrganisation.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>

                {sousOrganisation.sousOrganisation.projects.length > 0 && (
                  <>
                    <Title level={4} style={{ ...styles.text, marginTop: '24px' }}>
                      Projects
                    </Title>
                    <Row gutter={[16, 16]}>
                      {sousOrganisation.sousOrganisation.projects.map((project, index) => (
                        <Col xs={24} sm={12} key={index}>
                          <Card 
                            size="small"
                            style={{ ...styles.mainCard, background: isDarkMode ? '#3d3d3d' : '#ffffff' }}
                          >
                            <Text strong style={styles.text}>{project.title}</Text>
                            <Paragraph style={{ ...styles.text, opacity: 0.8 }}>
                              {project.description}
                            </Paragraph>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
}

export default SousOrganisationDetail;
