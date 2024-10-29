const Responsable = require('../models/responsable');
const bcrypt = require('bcrypt');
const searchRole = require('../utils/searchRole');
const handleError = require('../utils/handleError');

exports.createResponsable = async (req, res) => {
    const { nom, prenom, email, phone, mdp } = req.body;

    if (!nom || !email || !mdp) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const { user, role } = await searchRole(email);

        if (user) {
            return res.status(409).json({ error: `Email already exists for ${role}` });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);
        const responsable = new Responsable({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdResponsable = await responsable.save();

        res.status(201).json({
            id: createdResponsable._id,
            nom: createdResponsable.nom,
            prenom: createdResponsable.prenom,
            email: createdResponsable.email,
            phone: createdResponsable.phone,
            mdp: createdResponsable.mdp,
        });

    } catch (error) {
        res.status(500).json({ error: 'Error registering responsable: ' + error.message });
    }
};

exports.getAllResponsables = async (req, res) => {
    try {
        const responsables = await Responsable.find({})
            .populate('organisation', 'title')
            .populate('sousOrganisation', 'title')
            .populate('projects');
        res.status(200).json(responsables);
    } catch (error) {
        handleError(res, 400, 'Error fetching responsables: ' + error.message);
    }
};

exports.getResponsableById = async (req, res) => {
    const { id } = req.params;

    try {
        const responsable = await Responsable.findById(id).populate('projects');
        if (responsable) {
            res.status(200).json(responsable);
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching responsable: ' + error.message);
    }
};

exports.updateResponsable = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedResponsable = await Responsable.findByIdAndUpdate(id, updates, { new: true });
        if (updatedResponsable) {
            res.status(200).json(updatedResponsable);
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating responsable: ' + error.message);
    }
};

exports.deleteResponsable = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Responsable.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Responsable deleted successfully' });
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting responsable: ' + error.message);
    }
};
