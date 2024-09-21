const Project = require('../models/project');
const MembreEquipe = require('../models/membreEquipe');

exports.createProject = async (req, res) => {
    const { tittle, description, organisation, sousOrganisation, chefProject, responsable, startDate, endDate, budget, revenue, status } = req.body;

    if (!tittle || !status) {
        return handleError(res, 400, 'Tittle, one of Organisation or SousOrganisation, ChefProject, and Status are required');
    }

    try {
        const project = new Project({
            tittle,
            description,
            organisation: organisation || null,
            sousOrganisation: sousOrganisation || null,
            chefProject,
            responsable: responsable || null,
            startDate,
            endDate,
            budget,
            revenue: revenue || 0,
            status
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        handleError(res, 400, 'Error creating project: ' + error.message);
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('organisation', 'name')
            .populate('sousOrganisation', 'name')
            .populate('chefProject', 'nom prenom')
            .populate('responsable', 'nom prenom');

        const projectsWithDetails = await Promise.all(projects.map(async (project) => {
            const nbMembreEquipe = await MembreEquipe.countDocuments({ _id: { $in: project.membreEquipe } });
            return {
                ...project._doc,
                nbMembreEquipe,
                revenue: project.revenue
            };
        }));

        res.status(200).json(projectsWithDetails);
    } catch (error) {
        handleError(res, 500, 'Error fetching projects: ' + error.message);
    }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id)
            .populate('organisation', 'name')
            .populate('sousOrganisation', 'name')
            .populate('chefProject', 'nom prenom')
            .populate('responsable', 'nom prenom');

        if (!project) {
            return handleError(res, 404, 'Project not found');
        }

        const nbMembreEquipe = await MembreEquipe.countDocuments({ _id: { $in: project.membreEquipe } });

        res.status(200).json({
            ...project._doc,
            nbMembreEquipe,
            revenue: project.revenue
        });
    } catch (error) {
        handleError(res, 500, 'Error fetching project: ' + error.message);
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const project = await Project.findByIdAndUpdate(id, updateFields, { new: true })
            .populate('organisation', 'name')
            .populate('sousOrganisation', 'name')
            .populate('chefProject', 'nom prenom')
            .populate('responsable', 'nom prenom');

        if (!project) {
            return handleError(res, 404, 'Project not found');
        }

        res.status(200).json({
            ...project._doc,
            revenue: project.revenue
        });
    } catch (error) {
        handleError(res, 400, 'Error updating project: ' + error.message);
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return handleError(res, 404, 'Project not found');
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        handleError(res, 500, 'Error deleting project: ' + error.message);
    }
};
