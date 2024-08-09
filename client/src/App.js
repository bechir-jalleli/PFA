// src/App.js
import React, { useState } from 'react';
import NavBar from './layouts/NavBar';
import ReadAdmins from './components/Admin/ReadAdmins';
import ReadResponsables from './components/Responsable/ReadResponsable';
import ReadChefProject from './components/ChefProject/ReadChefProject';
import ReadMembreEquipe from './components/MembreEquipe/ReadMembreEquipe';
import ReadTache from './components/Tache/ReadTache';
import ReadOrganisations from './components/Organisation/ReadOrganisations';
import ReadSousOrganisations from './components/SousOrganisation/ReadSousOrganisations'; // Import the new component
import UpdateTache from './components/Tache/UpdateTache';
import ReadProjects from './components/Project/ReadProjects';


function App() {
  const [selectedComponent, setSelectedComponent] = useState('admin');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'admin':
        return <ReadAdmins />;
      case 'responsables':
        return <ReadResponsables />;
      case 'chefs-project':
        return <ReadChefProject />;
      case 'membres-equipe':
        return <ReadMembreEquipe />;
      case 'taches':
        return <ReadTache />;
      case 'organisations':
        return <ReadOrganisations />;
      case 'sous-organisation': 
        return <ReadSousOrganisations />;
        case 'project': 
        return <ReadProjects />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div>
      <NavBar onSelect={setSelectedComponent} />
      <div style={{ padding: '20px' }}>
        {renderComponent()}
      </div>
    
      <br />
      <br /><br /><br /><br />
    
      
    </div>
  );
}

export default App;
