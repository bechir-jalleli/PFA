import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';

// Lazy load page components
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

// Lazy load specific components
const UpdateAdmin = lazy(() => import('../components/Admin/UpdateAdmin'));
const ReadResponsable = lazy(() => import('../components/Responsable/ReadResponsable'));
const CreateResponsable = lazy(() => import('../components/Responsable/CreateResponsable'));
const UpdateResponsable = lazy(() => import('../components/Responsable/UpdateResponsable'));
const DeleteResponsable = lazy(() => import('../components/Responsable/DeleteResponsable'));
const ResponsableInfo = lazy(() => import('../components/Responsable/ResponsableInfo'));

// ... Lazy load other specific components as needed ...

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute element={AdminPage} allowedRoles={['Admin']} />}>
          <Route path="update/:id" element={<UpdateAdmin />} />
        </Route>

        {/* Responsable Routes */}
        <Route path="/responsables" element={<PrivateRoute element={ResponsablePage} allowedRoles={['Admin', 'Responsable']} />}>
          <Route path="list" element={<ReadResponsable />} />
          <Route path="create" element={<CreateResponsable />} />
          <Route path="update/:id" element={<UpdateResponsable />} />
          <Route path="delete/:id" element={<DeleteResponsable />} />
          <Route path="info/:id" element={<ResponsableInfo />} />
        </Route>

        {/* Chef Project Routes */}
        <Route path="/chef-projects" element={<PrivateRoute element={ChefProjectPage} allowedRoles={['Admin', 'Responsable', 'Chef Project']} />}>
          {/* Add nested routes for Chef Project as needed */}
        </Route>

        {/* Membre Equipe Routes */}
        <Route path="/membre-equipes" element={<PrivateRoute element={MembreEquipePage} allowedRoles={['Admin', 'Responsable', 'Chef Project', 'Membre Equipe']} />}>
          {/* Add nested routes for Membre Equipe as needed */}
        </Route>

        {/* Organisation Routes */}
        <Route path="/organisations" element={<PrivateRoute element={OrganisationsPage} allowedRoles={['Admin']} />}>
          {/* Add nested routes for Organisation as needed */}
        </Route>

        {/* Sous Organisation Routes */}
        <Route path="/sous-organisations" element={<PrivateRoute element={SousOrganisationPage} allowedRoles={['Admin']} />}>
          {/* Add nested routes for Sous Organisation as needed */}
        </Route>

        {/* Project Routes */}
        <Route path="/projects" element={<PrivateRoute element={ProjectPage} allowedRoles={['Admin', 'Responsable', 'Chef Project', 'Membre Equipe']} />}>
          {/* Add nested routes for Project as needed */}
        </Route>

        {/* Taches Routes */}
        <Route path="/taches" element={<PrivateRoute element={TachesPage} allowedRoles={['Admin', 'Responsable', 'Chef Project', 'Membre Equipe']} />}>
          {/* Add nested routes for Taches as needed */}
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
