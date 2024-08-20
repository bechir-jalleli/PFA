// src/pages/HomePage.js
import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../layouts/SideBar';
import ReadAdmins from '../components/Admin/ReadAdmins';
import ReadMembreEquipe from '../components/MembreEquipe/ReadMembreEquipe';

const { Content } = Layout;

const ResponsablePage = () => {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ marginLeft: 200 }}> {/* Adjust marginLeft based on sidebar width */}
        <Content style={{ padding: '24px', minHeight: '100vh' }}>
          <div style={{ padding: 24, borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Welcome to GRCWebsite</h2>
            <p>Your platform for Governance, Risk, and Compliance management.</p>
          </div>
          <div style={{ marginTop: '24px' }}>
            <ReadAdmins />
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
    
  );
};


export default ResponsablePage;
