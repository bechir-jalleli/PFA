import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage'; // 404 Page
import LoginPage from '../pages/LoginPage'; // Login Page
import HomePage from '../pages/HomePage';
// Import components for Admin model
import AdminPage from '../pages/AdminPage';
import UpdateAdmin from '../components/Admin/UpdateAdmin';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminInfo from '../components/Admin/AdminInfo';

// Import components for Responsable model
import ResponsablePage from '../pages/ResponsablePage';
import CreateResponsable from '../components/Responsable/CreateResponsable';
import UpdateResponsable from '../components/Responsable/UpdateResponsable';
import DeleteResponsable from '../components/Responsable/DeleteResponsable';
import ReadResponsable from '../components/Responsable/ReadResponsable';
import ResponsableInfo from '../components/Responsable/ResponsableInfo';
import ResponsableDashboard from '../components/Responsable/ResponsableDashboard';

// Import components for Chef Project model
import ChefProjectPage from '../pages/ChefProjectPage';
import CreateChefProject from '../components/ChefProject/CreateChefProject';
import UpdateChefProject from '../components/ChefProject/UpdateChefProject';
import DeleteChefProject from '../components/ChefProject/DeleteChefProject';
import ReadChefProject from '../components/ChefProject/ReadChefProject';
import ChefProjectInfo from '../components/ChefProject/ChefProjectInfo';
import ChefProjectDashboard from '../components/ChefProject/ChefProjectDashboard';

// Import components for Membre Equipe model
import MembreEquipePage from '../pages/MembreEquipePage';
import CreateMembreEquipe from '../components/MembreEquipe/CreateMembreEquipe';
import UpdateMembreEquipe from '../components/MembreEquipe/UpdateMembreEquipe';
import DeleteMembreEquipe from '../components/MembreEquipe/DeleteMembreEquipe';
import ReadMembreEquipe from '../components/MembreEquipe/ReadMembreEquipe';
import MembreEquipeInfo from '../components/MembreEquipe/MembreEquipeInfo';
import MembreEquipeDashboard from '../components/MembreEquipe/MembreEquipeDashboard';

// Import components for Organisation model
import OrganisationsPage from '../pages/OrganisationsPage';
import CreateOrganisation from '../components/Organisation/CreateOrganisation';
import UpdateOrganisation from '../components/Organisation/UpdateOrganisation';
import DeleteOrganisation from '../components/Organisation/DeleteOrganisation';
import ReadOrganisation from '../components/Organisation/ReadOrganisations';
import OrganisationInfo from '../components/Organisation/OrganisationInfo';
import OrganisationsDashboard from '../components/Organisation/OrganisationsDashboard';

// Import components for Sous Organisation model
import SousOrganisationPage from '../pages/SousOrganisationPage';
import CreateSousOrganisation from '../components/SousOrganisation/CreateSousOrganisation';
import UpdateSousOrganisation from '../components/SousOrganisation/UpdateSousOrganisation';
import DeleteSousOrganisation from '../components/SousOrganisation/DeleteSousOrganisation';
import ReadSousOrganisation from '../components/SousOrganisation/ReadSousOrganisations';
import SousOrganisationInfo from '../components/SousOrganisation/SousOrganisationInfo';
import SousOrganisationDashboard from '../components/SousOrganisation/SousOrganisationDashboard';

// Import components for Project model
import ProjectPage from '../pages/ProjectPage';
import CreateProject from '../components/Project/CreateProject';
import UpdateProject from '../components/Project/UpdateProject';
import DeleteProject from '../components/Project/DeleteProject';
import ReadProject from '../components/Project/ReadProjects';
import ProjectInfo from '../components/Project/ProjectInfo';
import ProjectDashboard from '../components/Project/ProjectDashboard';

// Import components for Taches model
import TachesPage from '../pages/TachesPage';
import CreateTache from '../components/Tache/CreateTache';
import UpdateTache from '../components/Tache/UpdateTache';
import DeleteTache from '../components/Tache/DeleteTache';
import ReadTache from '../components/Tache/ReadTache';
import TacheInfo from '../components/Tache/TacheInfo';
import TachesDashboard from '../components/Tache/TachesDashboard';

function AppRoutes() {
  return (
    <Routes>
      {/* Normal route for '/' */}
      <Route path="/" element={<HomePage />} />
      
      {/* Admin Route with children */}
      <Route path="/admin" element={<PrivateRoute element={AdminPage} allowedRoles={['Admin']} />}>
        <Route path="update/:id" element={<PrivateRoute element={UpdateAdmin} />} />
        <Route path="dashboard" element={<PrivateRoute element={AdminDashboard} />} />
        <Route path="info/:id" element={<PrivateRoute element={AdminInfo} />} />
      </Route>

      {/* Parent routes with child routes for each model */}
      <Route path="/responsables" element={<PrivateRoute element={ResponsablePage} />}>
        <Route path="dashboard" element={<PrivateRoute element={ResponsableDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateResponsable} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateResponsable} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteResponsable} />} />
        <Route path="list" element={<PrivateRoute element={ReadResponsable} />} />
        <Route path="info/:id" element={<PrivateRoute element={ResponsableInfo} />} />
      </Route>

      <Route path="/chef-projects" element={<PrivateRoute element={ChefProjectPage} />}>
        <Route path="dashboard" element={<PrivateRoute element={ChefProjectDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateChefProject} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateChefProject} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteChefProject} />} />
        <Route path="list" element={<PrivateRoute element={ReadChefProject} />} />
        <Route path="info/:id" element={<PrivateRoute element={ChefProjectInfo} />} />
      </Route>

      <Route path="/membre-equipes" element={<PrivateRoute element={MembreEquipePage} />}>
        <Route path="dashboard" element={<PrivateRoute element={MembreEquipeDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateMembreEquipe} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateMembreEquipe} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteMembreEquipe} />} />
        <Route path="list" element={<PrivateRoute element={ReadMembreEquipe} />} />
        <Route path="info/:id" element={<PrivateRoute element={MembreEquipeInfo} />} />
      </Route>

      <Route path="/organisations" element={<PrivateRoute element={OrganisationsPage} />}>
        <Route path="dashboard" element={<PrivateRoute element={OrganisationsDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateOrganisation} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateOrganisation} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteOrganisation} />} />
        <Route path="list" element={<PrivateRoute element={ReadOrganisation} />} />
        <Route path="info/:id" element={<PrivateRoute element={OrganisationInfo} />} />
      </Route>

      <Route path="/sous-organisations" element={<PrivateRoute element={SousOrganisationPage} />}>
        <Route path="dashboard" element={<PrivateRoute element={SousOrganisationDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateSousOrganisation} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateSousOrganisation} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteSousOrganisation} />} />
        <Route path="list" element={<PrivateRoute element={ReadSousOrganisation} />} />
        <Route path="info/:id" element={<PrivateRoute element={SousOrganisationInfo} />} />
      </Route>

      <Route path="/projects" element={<PrivateRoute element={ProjectPage} />}>
        <Route path="dashboard" element={<PrivateRoute element={ProjectDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateProject} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateProject} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteProject} />} />
        <Route path="list" element={<PrivateRoute element={ReadProject} />} />
        <Route path="info/:id" element={<PrivateRoute element={ProjectInfo} />} />
      </Route>

      <Route path="/taches" element={<PrivateRoute element={TachesPage} />}>
        <Route path="dashboard" element={<PrivateRoute element={TachesDashboard} />} />
        <Route path="create" element={<PrivateRoute element={CreateTache} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateTache} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteTache} />} />
        <Route path="list" element={<PrivateRoute element={ReadTache} />} />
        <Route path="info/:id" element={<PrivateRoute element={TacheInfo} />} />
      </Route>

      {/* Additional routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
