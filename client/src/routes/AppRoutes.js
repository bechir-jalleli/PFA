import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

// Import components for Admin model
import AdminPage from '../pages/AdminPage';
import UpdateAdmin from '../components/Admin/UpdateAdmin';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminInfo from '../components/Admin/AdminInfo';

// Import components for responsable model
import ResponsablePage from '../pages/ResponsablePage';
import CreateResponsable from '../components/Responsable/CreateResponsable';
import UpdateResponsable from '../components/Responsable/UpdateResponsable';
import DeleteResponsable from '../components/Responsable/DeleteResponsable';
import ReadResponsable from '../components/Responsable/ReadResponsable';
import ResponsableInfo from '../components/Responsable/ResponsableInfo';
import ResponsableDashboard from '../components/Responsable/ResponsableDashboard';

// Import components for chef-project model
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
      <Route path="/" element={<HomePage />} />
      
      {/* Admin Route with children */}
      <Route path="/admin" element={<PrivateRoute element={AdminPage} allowedRoles={['admin']} />} />
      
      {/* Responsable Routes */}
      <Route path="/responsables" element={<PrivateRoute element={ResponsablePage} allowedRoles={['admin', 'responsable']} />}>
        <Route path="dashboard" element={<PrivateRoute element={ResponsableDashboard} allowedRoles={['admin', 'responsable']} />} />
        <Route path="create" element={<PrivateRoute element={CreateResponsable} allowedRoles={['admin']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateResponsable} allowedRoles={['admin', 'responsable']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteResponsable} allowedRoles={['admin']} />} />
        <Route path="list" element={<PrivateRoute element={ReadResponsable} allowedRoles={['admin', 'responsable']} />} />
        <Route path="info/:id" element={<PrivateRoute element={ResponsableInfo} allowedRoles={['admin', 'responsable']} />} />
      </Route>

      {/* chef-project Routes */}
      <Route path="/chef-projects" element={<PrivateRoute element={ChefProjectPage} allowedRoles={['admin', 'responsable', 'chef-project']} />}>
        <Route path="dashboard" element={<PrivateRoute element={ChefProjectDashboard} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="create" element={<PrivateRoute element={CreateChefProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateChefProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteChefProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="list" element={<PrivateRoute element={ReadChefProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="info/:id" element={<PrivateRoute element={ChefProjectInfo} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
      </Route>

      {/* Membre Equipe Routes */}
      <Route path="/membre-equipes" element={<PrivateRoute element={MembreEquipePage} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />}>
        <Route path="dashboard" element={<PrivateRoute element={MembreEquipeDashboard} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="create" element={<PrivateRoute element={CreateMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="list" element={<PrivateRoute element={ReadMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="info/:id" element={<PrivateRoute element={MembreEquipeInfo} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
      </Route>

      {/* Organisation Routes */}
      <Route path="/organisations" element={<PrivateRoute element={OrganisationsPage} allowedRoles={['admin', 'responsable']} />}>
        <Route path="dashboard" element={<PrivateRoute element={OrganisationsDashboard} allowedRoles={['admin', 'responsable']} />} />
        <Route path="create" element={<PrivateRoute element={CreateOrganisation} allowedRoles={['admin']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateOrganisation} allowedRoles={['admin']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteOrganisation} allowedRoles={['admin']} />} />
        <Route path="list" element={<PrivateRoute element={ReadOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="info/:id" element={<PrivateRoute element={OrganisationInfo} allowedRoles={['admin', 'responsable']} />} />
      </Route>

      {/* Sous Organisation Routes */}
      <Route path="/sous-organisations" element={<PrivateRoute element={SousOrganisationPage} allowedRoles={['admin', 'responsable']} />}>
        <Route path="dashboard" element={<PrivateRoute element={SousOrganisationDashboard} allowedRoles={['admin', 'responsable']} />} />
        <Route path="create" element={<PrivateRoute element={CreateSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="list" element={<PrivateRoute element={ReadSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="info/:id" element={<PrivateRoute element={SousOrganisationInfo} allowedRoles={['admin', 'responsable']} />} />
      </Route>

      {/* Project Routes */}
      <Route path="/projects" element={<PrivateRoute element={ProjectPage} allowedRoles={['admin', 'responsable', 'chef-project']} />}>
        <Route path="dashboard" element={<PrivateRoute element={ProjectDashboard} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="create" element={<PrivateRoute element={CreateProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="list" element={<PrivateRoute element={ReadProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="info/:id" element={<PrivateRoute element={ProjectInfo} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
      </Route>

      {/* Taches Routes */}
      <Route path="/taches" element={<PrivateRoute element={TachesPage} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />}>
        <Route path="dashboard" element={<PrivateRoute element={TachesDashboard} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="create" element={<PrivateRoute element={CreateTache} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateTache} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteTache} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="list" element={<PrivateRoute element={ReadTache} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="info/:id" element={<PrivateRoute element={TacheInfo} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
      </Route>

      {/* Additional routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
