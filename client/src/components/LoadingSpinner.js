import React from 'react';
import { Spin } from 'antd';
import '../styles/components/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-wrapper">
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
