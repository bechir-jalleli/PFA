const Organisation = require('../models/organisation');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

exports.createOrganisation = async (req, res) => {
    const { nom, details } = req.body;

    if (!nom) {
        return handleError(res, 400, 'Name is required');
    }

    try {
        const organisation = new Organisation({ nom, details });
        const createdOrganisation = await organisation.save();
        res.status(201).json(createdOrganisation);
    } catch (error) {
        handleError(res, 400, 'Error creating organisation: ' + error.message);
    }
};

exports.getAllOrganisations = async (req, res) => {
    try {
        const organisations = await Organisation.find({});
        res.status(200).json(organisations);
    } catch (error) {
        handleError(res, 400, 'Error fetching organisations: ' + error.message);
    }
};

exports.getOrganisationById = async (req, res) => {
    const { id } = req.params;

    try {
        const organisation = await Organisation.findById(id);
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
