import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'responsable':
          navigate('/responsables/dashboard');
          break;
        case 'chef-project':
          navigate('/chef-projects/dashboard');
          break;
        case 'Membre':
          navigate('/membre-equipes/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return <div></div>;
};

export default Dashboard;
