import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, notification, Avatar, Button, Typography, Row, Col, Divider, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, CrownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${id}`);
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin info:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch admin information',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!admin) {
    return <div>No admin information found.</div>;
  }

  return (
    <div style={{ 
      padding: '40px',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
    }}>
      <Card
        style={{
          maxWidth: 800,
          margin: '0 auto',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          padding: '40px',
          marginBottom: '30px',
          borderRadius: '20px 20px 0 0',
        }}>
          <Row gutter={24} align="middle">
            <Col>
              <Avatar size={120} icon={<UserOutlined />} style={{ backgroundColor: '#fff', color: '#1890ff' }} />
            </Col>
            <Col flex="auto">
              <Title level={2} style={{ margin: 0, color: '#fff' }}>{admin.nom} {admin.prenom}</Title>
              <Tag color="#fff" style={{ color: '#1890ff', marginTop: '10px' }}>
                <Text strong>{admin.role.toUpperCase()}</Text>
              </Tag>
            </Col>
          </Row>
        </div>

        <div style={{ padding: '0 40px 40px' }}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={12}>
              <InfoItem icon={<MailOutlined />} label="Email" value={admin.email} />
            </Col>
            <Col span={24} md={12}>
              <InfoItem icon={<PhoneOutlined />} label="Phone" value={admin.phone} />
            </Col>
            <Col span={24}>
              <InfoItem icon={<IdcardOutlined />} label="ID" value={admin._id} />
            </Col>
            <Col span={24}>
              <InfoItem icon={<CrownOutlined />} label="Position" value={admin.role} />
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button 
              type="primary" 
              onClick={() => navigate(-1)} 
              style={{ marginRight: '10px' }}
              size="large"
            >
              Back
            </Button>
            <Button 
              onClick={() => navigate(`/admin/update/${admin._id}`)} 
              size="large"
            >
              Edit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {React.cloneElement(icon, { style: { fontSize: '24px', marginRight: '10px', color: '#1890ff' } })}
    <div>
      <Text type="secondary">{label}</Text>
      <div>
        <Text strong>{value}</Text>
      </div>
    </div>
  </div>
);

export default AdminInfo;
