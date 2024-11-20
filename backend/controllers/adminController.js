const mongoose = require('mongoose'); 
const Admin = require('../models/admin');
const Organisation = require('../models/organisation');
const SousOrganisation = require('../models/sousOrganisation');
const Project = require('../models/project');
const ChefProject = require('../models/chefProject');
const Responsable = require('../models/responsable');
const MembreEquipe = require('../models/membreEquipe');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');

exports.getAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid admin ID' });
        }
        const admin = await Admin.findById(id);
        console.log(admin.nom)
        if (!admin) return handleError(res, 404, 'Admin not found');
        res.status(200).json(admin);
    } catch (error) {
        handleError(res, 400, `Error fetching admin: ${error.message}`);
    }
};

exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    try {
        if (updates.mdp) {
            const saltRounds = 10;
            updates.mdp = await bcrypt.hash(updates.mdp, saltRounds);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, { new: true });

        if (updatedAdmin) {
            return res.status(200).json(updatedAdmin);
        } else {
            return res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        return res.status(400).json({ error: `Error updating admin: ${error.message}` });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { nom, prenom, email, phone, mdp, role } = req.body;


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(mdp, saltRounds);

        const newAdmin = new Admin({
            nom,
            prenom,
            email,
            phone,
            mdp: hashedPassword, 
            role,
        });

        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

    exports.getInfo = async (req, res) => {
        try {
            const organisationCount = await Organisation.countDocuments();
            const sousOrganisationCount = await SousOrganisation.countDocuments();
            const totalProjects = await Project.countDocuments();
            const chefProjectCount = await ChefProject.countDocuments();
            const responsableCount = await Responsable.countDocuments();
            const membreEquipeCount = await MembreEquipe.countDocuments();

            const inProgressCount = await Project.countDocuments({ status: 'In Progress' });
            const completedCount = await Project.countDocuments({ status: 'Completed' });
            const delayedCount = await Project.countDocuments({ status: 'Delayed' });

            const totalEmployees = chefProjectCount + responsableCount + membreEquipeCount;

            const activeChefProjects = await ChefProject.countDocuments({ isLoggedIn: true });
            const activeResponsables = await Responsable.countDocuments({ isLoggedIn: true });
            const activeMembreEquipes = await MembreEquipe.countDocuments({ isLoggedIn: true });

            const totalActiveUsers = activeChefProjects + activeResponsables + activeMembreEquipes;

            res.status(200).json({
                organisationCount,
                sousOrganisationCount,
                projectCount: totalProjects,
                totalEmployees,
                chefProjectCount,
                responsableCount,
                membreEquipeCount,
                projectStatuses: {
                    inProgress: inProgressCount,
                    completed: completedCount,
                    delayed: delayedCount
                },
                activeUsers: totalActiveUsers 
            });
        } catch (error) {
            console.error('Error in getInfo:', error);
            res.status(500).json({ message: 'Error retrieving information: ' + error.message });
        }
    };
