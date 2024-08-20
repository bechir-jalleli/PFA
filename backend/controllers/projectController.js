    const Project = require('../models/Project');

    // Create a new project
    exports.createProject = async (req, res) => {
        const { name, description, organisation, sousOrganisation, chefProject, startDate, endDate, budget } = req.body;

        if (!name || (!organisation && !sousOrganisation) || !chefProject) {
            return handleError(res, 400, 'Name, one of Organisation or SousOrganisation, and ChefProject are required');
        }

        try {
            const project = new Project({
                name,
                description,
                organisation: organisation || null,
                sousOrganisation: sousOrganisation || null,
                chefProject,
                startDate,
                endDate,
                budget
            });

            const createdProject = await project.save();
            res.status(201).json(createdProject);
        } catch (error) {
            handleError(res, 400, 'Error creating project: ' + error.message);
        }
    };

    // Get all projects
    exports.getAllProjects = async (req, res) => {
        try {
            const projects = await Project.find()
                .populate('organisation', 'name')
                .populate('sousOrganisation', 'name')
                .populate('chefProject', 'nom prenom');
            res.status(200).json(projects);
        } catch (error) {
            handleError(res, 500, 'Error fetching projects: ' + error.message);
        }
    };

    // Get a project by ID
    exports.getProjectById = async (req, res) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id)
                .populate('organisation', 'name')
                .populate('sousOrganisation', 'name')
                .populate('chefProject', 'nom prenom');

            if (!project) {
                return handleError(res, 404, 'Project not found');
            }

            res.status(200).json(project);
        } catch (error) {
            handleError(res, 500, 'Error fetching project: ' + error.message);
        }
    };

    // Update a project
    exports.updateProject = async (req, res) => {
        const { id } = req.params;
        const updateFields = req.body;

        try {
            const project = await Project.findByIdAndUpdate(id, updateFields, { new: true })
                .populate('organisation', 'name')
                .populate('sousOrganisation', 'name')
                .populate('chefProject', 'nom prenom');

            if (!project) {
                return handleError(res, 404, 'Project not found');
            }

            res.status(200).json(project);
        } catch (error) {
            handleError(res, 400, 'Error updating project: ' + error.message);
        }
    };

    // Delete a project
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
