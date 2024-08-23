// src/layouts/Footer.js
import React from 'react';
import { Layout, Row, Col, Typography, Space, theme } from 'antd';
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  const { token } = theme.useToken();

  const iconStyle = {
    fontSize: '24px',
    color: token.colorTextSecondary,
    '&:hover': {
      color: token.colorPrimary,
    },
  };

  return (
    <AntFooter
      style={{
        background: token.colorBgContainer,
        color: token.colorTextSecondary,
        padding: '24px',
      }}
    >
      <Row justify="space-between" align="middle" gutter={[0, 16]}>
        <Col xs={24} sm={12}>
          <Text>© 2023 GRCWebsite. All Rights Reserved.</Text>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
          <Space size="large">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={iconStyle} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={iconStyle} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={iconStyle} />
            </Link>
          </Space>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
