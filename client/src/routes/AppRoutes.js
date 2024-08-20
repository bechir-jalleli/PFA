import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import AdminPage from '../pages/AdminPage';
import ResponsablePage from '../pages/ResponsablePage';
import ChefProjectPage from '../pages/ChefProjectPage';
import MembreEquipePage from '../pages/MembreEquipePage';
import OrganisationsPage from '../pages/OrganisationsPage';
import SousOrganisationPage from '../pages/SousOrganisationPage';
import ProjectPage from '../pages/ProjectPage';
import TachesPage from '../pages/TachesPage';
import HomePage from '../pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/responsables" element={<ResponsablePage />} />
      <Route path="/chef-projects" element={<ChefProjectPage />} />
      <Route path="/membre-equipes" element={<MembreEquipePage />} />
      <Route path="/organisations" element={<OrganisationsPage />} />
      <Route path="/sous-organisation" element={<SousOrganisationPage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/taches" element={<TachesPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
