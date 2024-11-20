const Tache = require('../models/tache');
const handleError = require('../utils/handleError');

const MembreEquipe = require('../models/membreEquipe');
const Project = require('../models/project');

exports.createTache = async (req, res) => {
    const { titre, description, status, priority, startDate, endDate, membreEquipe, project } = req.body;

    if (!titre) return res.status(400).json({ error: 'Le titre est obligatoire.' });
    if (!startDate) return res.status(400).json({ error: 'La date de début est obligatoire.' });
    if (!membreEquipe) return res.status(400).json({ error: 'Le membre d\'équipe est obligatoire.' });
    if (!project) return res.status(400).json({ error: 'Le projet est obligatoire.' });

    try {
        const tache = new Tache({ titre, description, status, priority, startDate, endDate, membreEquipe, project });
        const createdTache = await tache.save();

        const membre = await MembreEquipe.findById(membreEquipe);
        if (!membre) return res.status(404).json({ error: 'MembreEquipe introuvable.' });
        membre.taches.push(createdTache._id);
        await membre.save();

        const proj = await Project.findById(project);
        if (!proj) return res.status(404).json({ error: 'Projet introuvable.' });
        proj.taches.push(createdTache._id);
        await proj.save();

        res.status(201).json({
            id: createdTache._id,
            titre: createdTache.titre,
            description: createdTache.description,
            status: createdTache.status,
            priority: createdTache.priority,
            startDate: createdTache.startDate,
            endDate: createdTache.endDate,
            membreEquipe: createdTache.membreEquipe,
            project: createdTache.project,
        });
    } catch (error) {
        console.error('Erreur lors de la création de la tâche:', error.message);
        res.status(500).json({ error: `Erreur lors de la création de la tâche : ${error.message}` });
    }
};


exports.getAllTaches = async (req, res) => {
    try {
        const taches = await Tache.find({})
            .populate('project', '_id title')
            .populate('membreEquipe', '_id nom prenom');

        res.status(200).json(taches);
    } catch (error) {
        handleError(res, 400, `Erreur lors de la récupération des tâches : ${error.message}`);
    }
};

exports.getTacheById = async (req, res) => {
    const { id } = req.params;

    try {
        const tache = await Tache.findById(id)
            .populate('project', '_id title')
            .populate('membreEquipe', '_id nom prenom');

        if (tache) {
            res.status(200).json(tache);
        } else {
            handleError(res, 404, 'Tâche non trouvée');
        }
    } catch (error) {
        handleError(res, 400, `Erreur lors de la récupération de la tâche : ${error.message}`);
    }
};

exports.updateTache = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTache = await Tache.findByIdAndUpdate(id, updates, { new: true })
            .populate('project', '_id title')
            .populate('membreEquipe', '_id nom prenom');

        if (updatedTache) {
            res.status(200).json(updatedTache);
        } else {
            handleError(res, 404, 'Tâche non trouvée');
        }
    } catch (error) {
        handleError(res, 400, `Erreur lors de la mise à jour de la tâche : ${error.message}`);
    }
};

exports.deleteTache = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Tache.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: 'Tâche supprimée avec succès.' });
        } else {
            handleError(res, 404, 'Tâche non trouvée');
        }
    } catch (error) {
        handleError(res, 400, `Erreur lors de la suppression de la tâche : ${error.message}`);
    }
};
