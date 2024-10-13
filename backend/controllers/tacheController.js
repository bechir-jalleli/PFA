const Tache = require('../models/tache');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

exports.createTache = async (req, res) => {
    const {
        titre,
        description,
        status,
        priority,
        startDate,
        endDate,
        membreEquipe,
        project
    } = req.body;

    if (!titre || !startDate || !membreEquipe || !project) {
        return res.status(400).json({
            message: 'Title, startDate, membreEquipe, and project are required.'
        });
    }

    try {
        const tache = new Tache({
            titre,
            description,
            status,
            priority,
            startDate,
            endDate,
            membreEquipe,
            project
        });

        const createdTache = await tache.save();
        return res.status(201).json(createdTache);
    } catch (error) {
        return res.status(400).json({
            message: 'Error creating task: ' + error.message
        });
    }
};

exports.getAllTaches = async (req, res) => {
    try {
        const taches = await Tache.find({})
            .populate('project', '_id tittle')
            .populate('membreEquipe', '_id nom prenom');
        res.status(200).json(taches);
    } catch (error) {
        handleError(res, 400, 'Error fetching tasks: ' + error.message);
    }
};

exports.getTacheById = async (req, res) => {
    const { id } = req.params;

    try {
        const tache = await Tache.findById(id)
            .populate('project', '_id tittle')
            .populate('membreEquipe', '_id nom prenom');
        if (tache) {
            res.status(200).json(tache);
        } else {
            handleError(res, 404, 'Task not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching task: ' + error.message);
    }
};


exports.updateTache = async (req, res) => {
    const { id } = req.params;
    const { titre, description, status, priority, membreEquipe } = req.body; // Destructure the necessary fields

    try {
        const updatedTache = await Tache.findByIdAndUpdate(id, {
            titre,
            description,
            status,
            priority,
            membreEquipe, // Ensure this matches the schema
        }, { new: true })
        .populate('membreEquipe') // Populate as needed
        .populate('project'); // Populate project if necessary

        if (updatedTache) {
            res.status(200).json(updatedTache);
        } else {
            handleError(res, 404, 'Task not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating task: ' + error.message);
    }
};


exports.deleteTache = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Tache.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            handleError(res, 404, 'Task not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting task: ' + error.message);
    }
};

