const Project = require('../models/project');
const MembreEquipe = require('../models/membreEquipe');
const handleError = require('../utils/handleError');

exports.createProject = async (req, res) => {
    const { 
        title, 
        description, 
        chefProject, 
        startDate, 
        endDate, 
        budget, 
        revenue, 
        status, 
        taches 
    } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    if (!chefProject) {
        return res.status(400).json({ error: 'ChefProject ID is required' });
    }

    try {
        // Fetch the ChefProject to get the associated Responsable ID
        const chef = await ChefProject.findById(chefProject).populate('responsable');
        if (!chef) {
            return res.status(404).json({ error: 'ChefProject not found' });
        }
        const responsableId = chef.responsable?._id;
        if (!responsableId) {
            return res.status(404).json({ error: 'Associated Responsable not found' });
        }

        // Create the project
        const project = new Project({
            title,
            description,
            chefProject,
            startDate,
            endDate,
            budget,
            revenue,
            status,
            taches,
        });

        const createdProject = await project.save();

        const responsable = await Responsable.findById(responsableId);
        responsable.projects.push(createdProject._id);
        await responsable.save();

        chef.project = createdProject._id; 
        await chef.save();

        res.status(201).json({
            message: 'Project created successfully',
            project: createdProject,
        });
    } catch (error) {
        console.error('Error creating project:', error.message);
        res.status(400).json({ error: 'Error creating project: ' + error.message });
    }
};


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('chefProject', 'nom prenom')
            .populate('taches', 'title')
            .populate('risks', 'riskName');
        
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
            .populate('chefProject', 'nom prenom')
            .populate('taches', 'title')
            .populate('risks', 'riskName');

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
            .populate('chefProject', 'nom prenom')
            .populate('taches', 'title')
            .populate('risks', 'riskName');

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
