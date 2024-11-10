    const Organisation = require('../models/organisation');
    const SousOrganisation = require('../models/sousOrganisation'); 
    const Project = require('../models/project'); 
    const Responsable = require('../models/responsable'); 
    const Membre = require('../models/membreEquipe'); 
    const ChefProject = require('../models/chefProject'); 
    const handleError = require('../utils/handleError');

    exports.createOrganisation = async (req, res) => {
        const { title, description, chiffreAffaire, responsable } = req.body;

        if (!title) {
            return handleError(res, 400, 'Title is required');
        }
    

        try {
            const organisation = new Organisation({
                title,
                description,
                chiffreAffaire,
                responsable
            });

            const createdOrganisation = await organisation.save();
            res.status(201).json(createdOrganisation);
        } catch (error) {
            handleError(res, 400, 'Error creating organisation: ' + error.message);
        }
    };


    exports.getAllOrganisations = async (req, res) => {
        try {
            const organisations = await Organisation.find({});
            console.log(organisations)
            res.status(200).json(organisations);
        } catch (error) {
            handleError(res, 400, 'Error fetching organisations: ' + error.message);
        }
    };

    exports.getOrganisationById = async (req, res) => {
        const { id } = req.params;

        try {
            const organisation = await Organisation.findById(id)
                .populate('SousOrganisation') 
                .populate('responsable'); 
            if (organisation) {
                res.status(200).json(organisation);
            } else {
                handleError(res, 404, 'Organisation not found');
            }
        } catch (error) {
            handleError(res, 400, 'Error fetching organisation: ' + error.message);
        }
    };

    exports.updateOrganisation = async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedOrganisation = await Organisation.findByIdAndUpdate(id, updates, { new: true });
            if (updatedOrganisation) {
                res.status(200).json(updatedOrganisation);
            } else {
                handleError(res, 404, 'Organisation not found');
            }
        } catch (error) {
            handleError(res, 400, 'Error updating organisation: ' + error.message);
        }
    };

    exports.deleteOrganisation = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Organisation.findByIdAndDelete(id);
            if (result) {
                res.status(200).json({ message: 'Organisation deleted successfully' });
            } else {
                handleError(res, 404, 'Organisation not found');
            }
        } catch (error) {
            handleError(res, 400, 'Error deleting organisation: ' + error.message);
        }
    };

    exports.organisationDetails = async (req, res) => {
        const { id } = req.params;

        try {
            const organisation = await Organisation.findById(id)
                .populate('SousOrganisation') 
                .populate('responsable');

            if (!organisation) {
                return handleError(res, 404, 'Organisation not found');
            }

            const nbSousOrganisation = await SousOrganisation.countDocuments({ _id: { $in: organisation.SousOrganisation } });
            const nbProject = await Project.countDocuments({ organisation: id });
            const nbResponsable = await Responsable.countDocuments({ organisation: id });
            const nbMembre = await Membre.countDocuments({ organisation: id });
            const nbChefProject = await ChefProject.countDocuments({ organisation: id });

            const nbTotalEmployees = nbResponsable + nbMembre + nbChefProject;

            res.status(200).json({
                nbSousOrganisation,
                nbProject,
                nbTotalEmployees
            });
        } catch (error) {
            handleError(res, 400, 'Error fetching organisation details: ' + error.message);
        }
    };
