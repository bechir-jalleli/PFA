import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Spin, Typography, Tag, notification } from 'antd';
import axios from 'axios';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';

const DetailContainer = styled.div`
  padding: 24px;
  background: ${(props) => 
    props.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const RisqueDetail = () => {
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/risks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRisk(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch risk details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRisk();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <DetailContainer isDarkMode={isDarkMode}>
      <Typography.Title level={2}>Risk Details</Typography.Title>
      <Card>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Project">
            {risk?.project?.title || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Project Description">
            {risk?.project?.description || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Project Status">
            <Tag color={
              risk?.project?.status === 'Completed' ? 'green' :
              risk?.project?.status === 'In Progress' ? 'blue' : 'orange'
            }>
              {risk?.project?.status || 'Unknown'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Project Budget">
            ${risk?.project?.budget?.toLocaleString() || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Project Duration">
            {risk?.project?.startDate && risk?.project?.endDate
              ? `${new Date(risk.project.startDate).toLocaleDateString()} - ${new Date(risk.project.endDate).toLocaleDateString()}`
              : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Risk Description">
            {risk?.description || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Risk Impact">
            <Tag color={
              risk?.impact === 'High' ? 'red' :
              risk?.impact === 'Medium' ? 'orange' : 'green'
            }>
              {risk?.impact || 'Low'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Risk Note">
            {risk?.note || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {risk?.createdAt ? new Date(risk.createdAt).toLocaleString() : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {risk?.updatedAt ? new Date(risk.updatedAt).toLocaleString() : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </DetailContainer>
  );
};

export default RisqueDetail;
