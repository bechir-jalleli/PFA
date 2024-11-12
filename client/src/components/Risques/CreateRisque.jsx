import React, { useState, useEffect } from 'react';
import { Upload, Form, Input, Select, Button, notification, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

const CreateRisque = ({ onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProjects(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch projects',
      });
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isCsv = file.type === 'text/csv';
      if (!isCsv) {
        notification.error({
          message: 'Error',
          description: 'You can only upload CSV files!',
        });
      }
      setFileList(isCsv ? [file] : []);
      return false;
    },
    fileList,
    onRemove: () => {
      setFileList([]);
    },
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      let response;

      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append('file', fileList[0]);
        response = await axios.post('http://localhost:5000/risks', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
      } else {
        response = await axios.post('http://localhost:5000/risks', values, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
      }

      notification.success({
        message: 'Success',
        description: 'Risk(s) created successfully',
      });

      form.resetFields();
      setFileList([]);
      if (onCreateSuccess) onCreateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to create risk(s)',
      });
    }
  };

  return (
    <Form 
      form={form} 
      onFinish={onFinish} 
      layout="vertical"
      style={{ maxWidth: 600 }}
    >
      <Form.Item>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag CSV file to upload</p>
          <p className="ant-upload-hint">
            CSV should contain: project_id, description, impact (Low/Medium/High), note
          </p>
        </Dragger>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {fileList.length > 0 ? 'Upload Risks' : 'Create Risk'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRisque;
