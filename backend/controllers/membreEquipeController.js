const ChefProject = require('../models/chefProject');
const Project = require('../models/project');
const Responsable = require('../models/responsable');
const Organisation = require('../models/organisation');
const SousOrganisation = require('../models/sousOrganisation');
const Tache = require('../models/tache');
const MembreEquipe = require('../models/membreEquipe');
const handleError = require('../utils/handleError');

exports.createMembreEquipe = async (req, res) => {
    const { nom, prenom, email, phone, chefProject, taches } = req.body;

    if (!nom) return res.status(400).json({ error: 'Name is required' });
    if (!email) return res.status(400).json({ error: 'Email is required' });
    if (!chefProject) return res.status(400).json({ error: 'ChefProject is required' });

    try {
        if (await MembreEquipe.findOne({ email })) {
            return res.status(409).json({ error: 'MembreEquipe already exists' });
        }

        const membreEquipe = new MembreEquipe({
            nom,
            prenom,
            email,
            phone,
            chefProject,
            taches,
        });

        
        const createdMembreEquipe = await membreEquipe.save();

        const chef = await ChefProject.findById(chefProject);
        if (!chef) return res.status(404).json({ error: 'ChefProject not found' });

        chef.membresEquipe = chef.membresEquipe || [];
        chef.membresEquipe.push(createdMembreEquipe._id);
        await chef.save();

        if (chef.project) {
            const project = await Project.findById(chef.project);
            if (project) {
                project.membresEquipe = project.membresEquipe || [];
                project.membresEquipe.push(createdMembreEquipe._id);
                await project.save();
            }
        }

        res.status(201).json({
            id: createdMembreEquipe._id,
            nom: createdMembreEquipe.nom,
            prenom: createdMembreEquipe.prenom,
            email: createdMembreEquipe.email,
            phone: createdMembreEquipe.phone,
            chefProject: createdMembreEquipe.chefProject,
            taches: createdMembreEquipe.taches,
        });
    } catch (error) {
        console.error('Error creating MembreEquipe:', error.message);
        res.status(500).json({ error: `Error creating MembreEquipe: ${error.message}` });
    }
};


exports.getAllMembreEquipes = async (req, res) => {
    try {
        const membreEquipes = await MembreEquipe.find({})
            .populate('chefProject', 'nom prenom') 
            .populate({
                path: 'taches', 
                select: 'titre description status',
                populate: {
                    path: 'project',
                    select: 'title', 
                },
            });

        res.status(200).json(membreEquipes);
    } catch (error) {
        handleError(res, 400, `Error fetching membre equipes: ${error.message}`);
    }
};

exports.getMembreEquipeById = async (req, res) => {
    const { id } = req.params;

    try {
        const membreEquipe = await MembreEquipe.findById(id)
            .populate({
                path: 'chefProject',
                select: 'nom prenom',
                populate: [
                    {
                        path: 'responsable',
                        select: 'nom prenom',
                        populate: [
                            {
                                path: 'organisation',
                                select: 'title'
                            },
                            {
                                path: 'sousOrganisation',
                                select: 'title'
                            }
                        ]
                    },
                    {
                        path: 'project',
                        select: 'title'
                    }
                ]
            })
            .populate({
                path: 'taches',
                select: 'titre description status priority startDate endDate'
            });

        if (!membreEquipe) {
            return handleError(res, 404, 'MembreEquipe not found');
        }

        // Add null checks in the response construction
        const response = {
            id: membreEquipe._id,
            nom: membreEquipe.nom,
            prenom: membreEquipe.prenom,
            email: membreEquipe.email,
            phone: membreEquipe.phone,
            chefProject: membreEquipe.chefProject ? {
                id: membreEquipe.chefProject._id,
                nom: membreEquipe.chefProject.nom,
                prenom: membreEquipe.chefProject.prenom,
                project: membreEquipe.chefProject.project ? {
                    id: membreEquipe.chefProject.project._id,
                    title: membreEquipe.chefProject.project.title
                } : null,
                responsable: membreEquipe.chefProject.responsable ? {
                    id: membreEquipe.chefProject.responsable._id,
                    nom: membreEquipe.chefProject.responsable.nom,
                    prenom: membreEquipe.chefProject.responsable.prenom,
                    organisation: membreEquipe.chefProject.responsable.organisation?.title,
                    sousOrganisation: membreEquipe.chefProject.responsable.sousOrganisation?.title || null
                } : null
            } : null,
            taches: membreEquipe.taches || []
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching MembreEquipe:', error.message);
        handleError(res, 400, `Error fetching membre equipe: ${error.message}`);
    }
};




exports.updateMembreEquipe = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedMembreEquipe = await MembreEquipe.findByIdAndUpdate(id, updates, { new: true })
            .populate('chefProject', 'nom prenom') // Populate updated chefProject
            .populate('taches', 'titre description status'); // Populate updated taches

        if (updatedMembreEquipe) {
            return res.status(200).json(updatedMembreEquipe);
        }

        handleError(res, 404, 'MembreEquipe not found');
    } catch (error) {
        handleError(res, 400, `Error updating membre equipe: ${error.message}`);
    }
};

exports.deleteMembreEquipe = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await MembreEquipe.findByIdAndDelete(id);

        if (result) {
            return res.status(200).json({ message: 'MembreEquipe deleted successfully' });
        }

        handleError(res, 404, 'MembreEquipe not found');
    } catch (error) {
        handleError(res, 400, `Error deleting membre equipe: ${error.message}`);
    }
};
