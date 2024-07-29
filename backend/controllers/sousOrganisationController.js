const SousOrganisation = require('../models/sousOrganisation');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

exports.createSousOrganisation = async (req, res) => {
    const { nom, details, organisation } = req.body;

    if (!nom || !organisation) {
        return handleError(res, 400, 'Name and organisation are required');
    }

    try {
        const sousOrganisation = new SousOrganisation({ nom, details, organisation });
        const createdSousOrganisation = await sousOrganisation.save();
        res.status(201).json(createdSousOrganisation);
    } catch (error) {
        handleError(res, 400, 'Error creating sous-organisation: ' + error.message);
    }
};

exports.getAllSousOrganisations = async (req, res) => {
    try {
        const sousOrganisations = await SousOrganisation.find({}).populate('organisation');
        res.status(200).json(sousOrganisations);
    } catch (error) {
        handleError(res, 400, 'Error fetching sous-organisations: ' + error.message);
    }
};

exports.getSousOrganisationById = async (req, res) => {
    const { id } = req.params;

    try {
        const sousOrganisation = await SousOrganisation.findById(id).populate('organisation');
        if (sousOrganisation) {
            res.status(200).json(sousOrganisation);
        } else {
            handleError(res, 404, 'Sous-organisation not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching sous-organisation: ' + error.message);
    }
};

exports.updateSousOrganisation = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedSousOrganisation = await SousOrganisation.findByIdAndUpdate(id, updates, { new: true }).populate('organisation');
        if (updatedSousOrganisation) {
            res.status(200).json(updatedSousOrganisation);
        } else {
            handleError(res, 404, 'Sous-organisation not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating sous-organisation: ' + error.message);
    }
};

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
