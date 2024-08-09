import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client'
import App from './App';
import 'antd/dist/reset.css'; // For Ant Design v5



const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
