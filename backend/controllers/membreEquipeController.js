const MembreEquipe = require('../models/membreEquipe');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');

exports.createMembreEquipe = async (req, res) => {
    const { nom, prenom, email, phone, mdp } = req.body;
    if (!nom || !email || !mdp) return handleError(res, 400, 'Name, email, and password are required');

    try {
        if (await MembreEquipe.findOne({ email })) return handleError(res, 409, 'MembreEquipe already exists');

        const hashedPassword = await bcrypt.hash(mdp, 10);
        const membreEquipe = new MembreEquipe({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdMembreEquipe = await membreEquipe.save();
        res.status(201).json({ id: createdMembreEquipe._id, nom: createdMembreEquipe.nom, prenom: createdMembreEquipe.prenom, email: createdMembreEquipe.email, phone: createdMembreEquipe.phone });
    } catch (error) {
        handleError(res, 500, `Error registering membre equipe: ${error.message}`);
    }
};

exports.getAllMembreEquipes = async (req, res) => {
    try {
        const membreEquipes = await MembreEquipe.find({});
        res.status(200).json(membreEquipes);
    } catch (error) {
        handleError(res, 400, `Error fetching membre equipes: ${error.message}`);
    }
};

exports.getMembreEquipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const membreEquipe = await MembreEquipe.findById(id);
        if (membreEquipe) return res.status(200).json(membreEquipe);
        handleError(res, 404, 'MembreEquipe not found');
    } catch (error) {
        handleError(res, 400, `Error fetching membre equipe: ${error.message}`);
    }
};

exports.updateMembreEquipe = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedMembreEquipe = await MembreEquipe.findByIdAndUpdate(id, updates, { new: true });
        if (updatedMembreEquipe) return res.status(200).json(updatedMembreEquipe);
        handleError(res, 404, 'MembreEquipe not found');
    } catch (error) {
        handleError(res, 400, `Error updating membre equipe: ${error.message}`);
    }
};

exports.deleteMembreEquipe = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await MembreEquipe.findByIdAndDelete(id);
        if (result) return res.status(200).json({ message: 'MembreEquipe deleted successfully' });
        handleError(res, 404, 'MembreEquipe not found');
    } catch (error) {
        handleError(res, 400, `Error deleting membre equipe: ${error.message}`);
    }
};
