import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import '../styles/layouts/Footer.css';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12}>
          <Text>© 2023 GRCWebsite. All Rights Reserved.</Text>
        </Col>
        <Col xs={24} sm={12} className="footer-links">
          <Space size="large">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <GithubOutlined />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <LinkedinOutlined />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <TwitterOutlined />
            </Link>
          </Space>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
