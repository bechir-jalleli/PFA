import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter className="modern-footer">
      <div className="footer-content">
        <Text className="copyright">©{new Date().getFullYear()} GRC. All Rights Reserved.</Text>
        <Space className="social-icons">
          <GithubOutlined className="social-icon" />
          <TwitterOutlined className="social-icon" />
          <LinkedinOutlined className="social-icon" />
        </Space>
      </div>
      <style jsx>{`
        .modern-footer {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px;
          position: fixed;
          width: 100%;
          bottom: 0;
          z-index: 1000;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          font-size: 14px;
          background: linear-gradient(45deg, #1890ff, #36cfc9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .social-icons {
          display: flex;
          gap: 20px;
        }

        .social-icon {
          font-size: 20px;
          color: #1890ff;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          color: #36cfc9;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </AntFooter>
  );
};

export default Footer;
