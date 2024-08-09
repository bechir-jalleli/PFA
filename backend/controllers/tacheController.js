const Tache = require('../models/tache');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

exports.createTache = async (req, res) => {
    const { titre, description, status, chefProject } = req.body;

    if (!titre || !chefProject) {
        return handleError(res, 400, 'Title and chefProject are required');
    }

    try {
        const tache = new Tache({ titre, description, status, chefProject });
        const createdTache = await tache.save();
        res.status(201).json(createdTache);
    } catch (error) {
        handleError(res, 400, 'Error creating task: ' + error.message);
    }
};

exports.getAllTaches = async (req, res) => {
    try {
        const taches = await Tache.find({})
        res.status(200).json(taches);
    } catch (error) {
        handleError(res, 400, 'Error fetching tasks: ' + error.message);
    }
};

exports.getTacheById = async (req, res) => {
    const { id } = req.params;

    try {
        const tache = await Tache.findById(id).populate('chefProject');
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
    const updates = req.body;

    try {
        const updatedTache = await Tache.findByIdAndUpdate(id, updates, { new: true }).populate('chefProject');
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

