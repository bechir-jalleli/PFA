const ChefProject = require('../models/chefProject');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');

exports.createChefProject = async (req, res) => {
    const { nom, prenom, email, phone, mdp } = req.body;
    if (!nom || !email || !mdp) return handleError(res, 400, 'Name, email, and password are required');

    try {
        if (await ChefProject.findOne({ email })) return handleError(res, 409, 'ChefProject already exists');

        const hashedPassword = await bcrypt.hash(mdp, 10);
        const chefProject = new ChefProject({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdChefProject = await chefProject.save();
        res.status(201).json({ id: createdChefProject._id, nom: createdChefProject.nom, prenom: createdChefProject.prenom, email: createdChefProject.email, phone: createdChefProject.phone });
    } catch (error) {
        handleError(res, 500, `Error registering chef project: ${error.message}`);
    }
};

exports.getAllChefProjects = async (req, res) => {
    try {
        const chefProjects = await ChefProject.find({});
        res.status(200).json(chefProjects);
    } catch (error) {
        handleError(res, 400, `Error fetching chef projects: ${error.message}`);
    }
};

exports.getChefProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const chefProject = await ChefProject.findById(id);
        if (chefProject) return res.status(200).json(chefProject);
        handleError(res, 404, 'ChefProject not found');
    } catch (error) {
        handleError(res, 400, `Error fetching chef project: ${error.message}`);
    }
};

exports.updateChefProject = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedChefProject = await ChefProject.findByIdAndUpdate(id, updates, { new: true });
        if (updatedChefProject) return res.status(200).json(updatedChefProject);
        handleError(res, 404, 'ChefProject not found');
    } catch (error) {
        handleError(res, 400, `Error updating chef project: ${error.message}`);
    }
};

exports.deleteChefProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ChefProject.findByIdAndDelete(id);
        if (result) return res.status(200).json({ message: 'ChefProject deleted successfully' });
        handleError(res, 404, 'ChefProject not found');
    } catch (error) {
        handleError(res, 400, `Error deleting chef project: ${error.message}`);
    }
};
