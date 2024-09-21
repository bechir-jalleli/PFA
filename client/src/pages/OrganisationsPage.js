import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const OrganisationsPage = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default OrganisationsPage