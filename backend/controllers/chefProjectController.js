const ChefProject = require('../models/chefProject');
const Responsable = require('../models/responsable');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');

exports.createChefProject = async (req, res) => {
    const { nom, prenom, email, phone, responsable, salary } = req.body;

    if (!nom || !prenom) return handleError(res, 400, 'Le nom et le prénom sont obligatoires.');
    if (!email) return handleError(res, 400, 'L\'email est obligatoire.');
    if (!responsable) return handleError(res, 400, 'Le Responsable est obligatoire.');
    if (!salary) return handleError(res, 400, 'Le Salaire est obligatoire.');

    const mdp = 'Chef';

    try {
        if (await ChefProject.findOne({ email })) {
            return handleError(res, 409, 'L\'email existe déjà. Veuillez fournir un autre email.');
        }

        const chefProject = new ChefProject({ nom, prenom, email, phone, responsable, mdp, salary });
        const createdChefProject = await chefProject.save();

        const responsableRecord = await Responsable.findById(responsable);
        if (!responsableRecord) {
            return handleError(res, 404, 'Responsable non trouvé.');
        }

        await Responsable.findByIdAndUpdate(
            responsable,
            { $addToSet: { chefProjects: createdChefProject._id } }, 
            { new: true }
        );

        res.status(201).json({
            id: createdChefProject._id,
            nom: createdChefProject.nom,
            prenom: createdChefProject.prenom,
            email: createdChefProject.email,
            phone: createdChefProject.phone,
            responsable: createdChefProject.responsable,
            salary: createdChefProject.salary,
        });
    } catch (error) {
        handleError(res, 500, `Erreur lors de l'enregistrement du chef de projet : ${error.message}`);
    }
};






exports.getAllChefProjects = async (req, res) => {
    try {
        const chefProjects = await ChefProject.find({})
            .select('nom prenom email phone lastLogin isLoggedIn') 
            .populate('responsable')
            .populate('membresEquipe');
        
        res.status(200).json(chefProjects);
    } catch (error) {
        handleError(res, 400, `Error fetching chef projects: ${error.message}`);
    }
};



exports.getChefProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const chefProject = await ChefProject.findById(id)
        .populate('responsable')
        .populate('membresEquipe')
        .populate('project');

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
