const SousOrganisation = require('../models/sousOrganisation');
const Responsable = require('../models/responsable');
const Membre = require('../models/membreEquipe');
const ChefProject = require('../models/chefProject');
const Project = require('../models/project');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

// Create a new sous-organisation
exports.createSousOrganisation = async (req, res) => {
    const { title, description, organisation, responsable, projects } = req.body;

    if (!title || !organisation || !responsable) {
        return handleError(res, 400, 'Title, organisation, and responsable are required');
    }

    try {
        const sousOrganisation = new SousOrganisation({ title, description, organisation, responsable, projects });
        const createdSousOrganisation = await sousOrganisation.save();
        res.status(201).json(createdSousOrganisation);
    } catch (error) {
        handleError(res, 400, 'Error creating sous-organisation: ' + error.message);
    }
};

// Get all sous-organisations
exports.getAllSousOrganisations = async (req, res) => {
    try {
        const sousOrganisations = await SousOrganisation.find({})
            .populate('organisation')
            .populate('responsable')
            .populate('projects');
        res.status(200).json(sousOrganisations);
    } catch (error) {
        handleError(res, 400, 'Error fetching sous-organisations: ' + error.message);
    }
};

// Get sous-organisation by ID with additional details
exports.getSousOrganisationById = async (req, res) => {
    const { id } = req.params;

    try {
        const sousOrganisation = await SousOrganisation.findById(id).populate('organisation').populate('responsable').populate('projects');
        
        if (sousOrganisation) {
            const nbProject = await Project.countDocuments({ sousOrganisation: id });
            const nbResponsable = await Responsable.countDocuments({ sousOrganisation: id });
            const nbMembre = await Membre.countDocuments({ sousOrganisation: id });
            const nbChefProject = await ChefProject.countDocuments({ sousOrganisation: id });
            const nbTotalEmployees = nbResponsable + nbMembre + nbChefProject;

            res.status(200).json({
                sousOrganisation,
                nbProject,
                nbTotalEmployees,
            });
        } else {
            handleError(res, 404, 'Sous-organisation not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching sous-organisation: ' + error.message);
    }
};

// Update a sous-organisation
exports.updateSousOrganisation = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedSousOrganisation = await SousOrganisation.findByIdAndUpdate(id, updates, { new: true })
            .populate('organisation')
            .populate('responsable')
            .populate('projects');

        if (updatedSousOrganisation) {
            res.status(200).json(updatedSousOrganisation);
        } else {
            handleError(res, 404, 'Sous-organisation not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating sous-organisation: ' + error.message);
    }
};

// Delete a sous-organisation
exports.deleteSousOrganisation = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await SousOrganisation.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Sous-organisation deleted successfully' });
        } else {
            handleError(res, 404, 'Sous-organisation not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting sous-organisation: ' + error.message);
    }
};
