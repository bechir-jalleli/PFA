import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
        background: '#f0f2f5',
        borderTop: '1px solid #e8e8e8',
        padding: '16px',
        position: 'fixed',
        width: '100%',
        bottom: 0,
      }}
    >
      <Text>©2024 GRC. All Rights Reserved.</Text>
    </AntFooter>
  );
};

export default Footer;
