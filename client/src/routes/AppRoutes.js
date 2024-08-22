// src/routes/AppRoutes.js
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const ResponsablePage = lazy(() => import('../pages/ResponsablePage'));
const ChefProjectPage = lazy(() => import('../pages/ChefProjectPage'));
const MembreEquipePage = lazy(() => import('../pages/MembreEquipePage'));
const OrganisationsPage = lazy(() => import('../pages/OrganisationsPage'));
const SousOrganisationPage = lazy(() => import('../pages/SousOrganisationPage'));
const ProjectPage = lazy(() => import('../pages/ProjectPage'));
const TachesPage = lazy(() => import('../pages/TachesPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute element={AdminPage} />} />
        <Route path="/responsables" element={<PrivateRoute element={ResponsablePage} />} />
        <Route path="/chef-projects" element={<PrivateRoute element={ChefProjectPage} />} />
        <Route path="/membre-equipes" element={<PrivateRoute element={MembreEquipePage} />} />
        <Route path="/organisations" element={<PrivateRoute element={OrganisationsPage} />} />
        <Route path="/sous-organisation" element={<PrivateRoute element={SousOrganisationPage} />} />
        <Route path="/project" element={<PrivateRoute element={ProjectPage} />} />
        <Route path="/taches" element={<PrivateRoute element={TachesPage} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
