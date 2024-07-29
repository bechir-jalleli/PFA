const Project = require('../models/project');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

exports.createProject = async (req, res) => {
    const { nom, description, responsable } = req.body;

    if (!nom || !responsable) {
        return handleError(res, 400, 'Name and responsable are required');
    }

    try {
        const project = new Project({ nom, description, responsable });
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        handleError(res, 400, 'Error creating project: ' + error.message);
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('responsable');
        res.status(200).json(projects);
    } catch (error) {
        handleError(res, 400, 'Error fetching projects: ' + error.message);
    }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate('responsable');
        if (project) {
            res.status(200).json(project);
        } else {
            handleError(res, 404, 'Project not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching project: ' + error.message);
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true }).populate('responsable');
        if (updatedProject) {
            res.status(200).json(updatedProject);
        } else {
            handleError(res, 404, 'Project not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating project: ' + error.message);
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Project.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Project deleted successfully' });
        } else {
            handleError(res, 404, 'Project not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting project: ' + error.message);
    }
};
