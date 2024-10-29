import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import Profil from '../components/Profile';


// Admin components
import AdminPage from '../pages/AdminPage';
import UpdateAdmin from '../components/Admin/UpdateAdmin';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminDetail from '../components/Admin/AdminDetail';

// Responsable components
import ResponsablePage from '../pages/ResponsablePage';
import CreateResponsable from '../components/Responsable/CreateResponsable';
import UpdateResponsable from '../components/Responsable/UpdateResponsable';
import DeleteResponsable from '../components/Responsable/DeleteResponsable';
import ListResponsable from '../components/Responsable/ListResponsable';
import ResponsableDetail from '../components/Responsable/ResponsableDetail';
import ResponsableDashboard from '../components/Responsable/ResponsableDashboard';


// Chef-project components
import ChefProjectPage from '../pages/ChefProjectPage';
import CreateChefProject from '../components/ChefProject/CreateChefProject';
import UpdateChefProject from '../components/ChefProject/UpdateChefProject';
import DeleteChefProject from '../components/ChefProject/DeleteChefProject';
import ReadChefProject from '../components/ChefProject/ReadChefProject';
import ChefProjectDetail from '../components/ChefProject/ChefProjectDetail';
import ChefProjectDashboard from '../components/ChefProject/ChefProjectDashboard';

// Membre Equipe components
import MembreEquipePage from '../pages/MembreEquipePage';
import CreateMembreEquipe from '../components/MembreEquipe/CreateMembreEquipe';
import UpdateMembreEquipe from '../components/MembreEquipe/UpdateMembreEquipe';
import DeleteMembreEquipe from '../components/MembreEquipe/DeleteMembreEquipe';
import ReadMembreEquipe from '../components/MembreEquipe/ReadMembreEquipe';
import MembreEquipeDetail from '../components/MembreEquipe/MembreEquipeDetail';
import MembreEquipeDashboard from '../components/MembreEquipe/MembreEquipeDashboard';

// Organisation components
import OrganisationsPage from '../pages/OrganisationsPage';
import CreateOrganisation from '../components/Organisation/CreateOrganisation';
import UpdateOrganisation from '../components/Organisation/UpdateOrganisation';
import DeleteOrganisation from '../components/Organisation/DeleteOrganisation';
import ReadOrganisation from '../components/Organisation/ReadOrganisations';
import OrganisationDetail from '../components/Organisation/OrganisationDetail';
import OrganisationsDashboard from '../components/Organisation/OrganisationsDashboard';

// Sous Organisation components
import SousOrganisationPage from '../pages/SousOrganisationPage';
import CreateSousOrganisation from '../components/SousOrganisation/CreateSousOrganisation';
import UpdateSousOrganisation from '../components/SousOrganisation/UpdateSousOrganisation';
import DeleteSousOrganisation from '../components/SousOrganisation/DeleteSousOrganisation';
import ReadSousOrganisation from '../components/SousOrganisation/ReadSousOrganisations';
import SousOrganisationDetail from '../components/SousOrganisation/SousOrganisationDetail';
import SousOrganisationDashboard from '../components/SousOrganisation/SousOrganisationDashboard';

// Project components
import ProjectPage from '../pages/ProjectPage';
import CreateProject from '../components/Project/CreateProject';
import UpdateProject from '../components/Project/UpdateProject';
import DeleteProject from '../components/Project/DeleteProject';
import ReadProject from '../components/Project/ReadProjects';
import ProjectDetail from '../components/Project/ProjectDetail';
import ProjectDashboard from '../components/Project/ProjectDashboard';

// Taches components
import TachesPage from '../pages/TachesPage';
import CreateTache from '../components/Tache/CreateTache';
import UpdateTache from '../components/Tache/UpdateTache';
import DeleteTache from '../components/Tache/DeleteTache';
import ReadTache from '../components/Tache/ReadTache';
import TacheDetail from '../components/Tache/TacheDetail';
import TachesDashboard from '../components/Tache/TachesDashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Admin*/}
      <Route path="/admin" element={<PrivateRoute element={AdminPage} allowedRoles={['admin']} />}>
  <Route index element={<Navigate to="dashboard" />} /> 
  <Route path="dashboard" element={<PrivateRoute element={AdminDashboard} allowedRoles={['admin']} />} />
  <Route path="update/:id" element={<PrivateRoute element={UpdateAdmin} allowedRoles={['admin']} />} />
  <Route path="info/:id" element={<PrivateRoute element={AdminDetail} allowedRoles={['admin']} />} />
</Route>
      {/* Responsable  */}
      <Route path="/responsables" element={<PrivateRoute element={ResponsablePage} allowedRoles={['admin', 'responsable']} />}>
        <Route index element={<Navigate to="list" />} /> 
        <Route path="list" element={<PrivateRoute element={ListResponsable} allowedRoles={['admin', 'responsable']} />} />
        <Route path="create" element={<PrivateRoute element={CreateResponsable} allowedRoles={['admin']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateResponsable} allowedRoles={['admin', 'responsable']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteResponsable} allowedRoles={['admin']} />} />
        <Route path="info/:id" element={<PrivateRoute element={ResponsableDetail} allowedRoles={['admin']} />} />
        <Route path="dashboard" element={<PrivateRoute element={ResponsableDashboard} allowedRoles={['admin']} />} />

        </Route>


      {/* chef-project  */}
      <Route path="/chef-projects" element={<PrivateRoute element={ChefProjectPage} allowedRoles={['admin', 'responsable', 'chef-project']} />}>
      <Route index element={<Navigate to="list" />} /> 
      <Route path="dashboard" element={<PrivateRoute element={ChefProjectDashboard} allowedRoles={[ 'chef-project']} />} />
        <Route path="create" element={<PrivateRoute element={CreateChefProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateChefProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteChefProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="list" element={<PrivateRoute element={ReadChefProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="info/:id" element={<PrivateRoute element={ChefProjectDetail} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
      </Route>

      {/* Membre Equipe  */}
      <Route path="/membre-equipes" element={<PrivateRoute element={MembreEquipePage} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />}>
      <Route index element={<Navigate to="list" />} /> 
        <Route path="dashboard" element={<PrivateRoute element={MembreEquipeDashboard} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="create" element={<PrivateRoute element={CreateMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="list" element={<PrivateRoute element={ReadMembreEquipe} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="info/:id" element={<PrivateRoute element={MembreEquipeDetail} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
      </Route>

      {/* Organisation  */}
      <Route path="/organisations" element={<PrivateRoute element={OrganisationsPage} allowedRoles={['admin', 'responsable']} />}>
      <Route index element={<Navigate to="dashboard" />} /> 
        <Route path="dashboard" element={<PrivateRoute element={OrganisationsDashboard} allowedRoles={['admin', 'responsable']} />} />
        <Route path="create" element={<PrivateRoute element={CreateOrganisation} allowedRoles={['admin']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateOrganisation} allowedRoles={['admin']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteOrganisation} allowedRoles={['admin']} />} />
        <Route path="list" element={<PrivateRoute element={ReadOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="info/:id" element={<PrivateRoute element={OrganisationDetail} allowedRoles={['admin', 'responsable']} />} />
      </Route>

      {/* Sous Organisation  */}
      <Route path="/sous-organisations" element={<PrivateRoute element={SousOrganisationPage} allowedRoles={['admin', 'responsable']} />}>
        <Route path="dashboard" element={<PrivateRoute element={SousOrganisationDashboard} allowedRoles={['admin', 'responsable']} />} />
        <Route path="create" element={<PrivateRoute element={CreateSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="list" element={<PrivateRoute element={ReadSousOrganisation} allowedRoles={['admin', 'responsable']} />} />
        <Route path="info/:id" element={<PrivateRoute element={SousOrganisationDetail} allowedRoles={['admin', 'responsable']} />} />
      </Route>

      {/* Project  */}
      <Route path="/projects" element={<PrivateRoute element={ProjectPage} allowedRoles={['admin', 'responsable', 'chef-project']} />}>
        <Route path="dashboard" element={<PrivateRoute element={ProjectDashboard} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="create" element={<PrivateRoute element={CreateProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteProject} allowedRoles={['admin', 'responsable']} />} />
        <Route path="list" element={<PrivateRoute element={ReadProject} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="info/:id" element={<PrivateRoute element={ProjectDetail} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
      </Route>

      {/* Taches  */}
      <Route path="/taches" element={<PrivateRoute element={TachesPage} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />}>
        <Route path="dashboard" element={<PrivateRoute element={TachesDashboard} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="create" element={<PrivateRoute element={CreateTache} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="update/:id" element={<PrivateRoute element={UpdateTache} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="delete/:id" element={<PrivateRoute element={DeleteTache} allowedRoles={['admin', 'responsable', 'chef-project']} />} />
        <Route path="list" element={<PrivateRoute element={ReadTache} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
        <Route path="info/:id" element={<PrivateRoute element={TacheDetail} allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
      </Route>
      
      <Route path="/dashboard"  element={<PrivateRoute element={Dashboard}  allowedRoles={['admin', 'responsable', 'chef-project', 'Membre']} />} />
      
      <Route path="/profil" element={<Profil/>} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}   

export default AppRoutes;
