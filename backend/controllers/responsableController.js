const Responsable = require('../models/responsable');
const bcrypt = require('bcrypt');
const searchRole = require('../utils/searchRole');
const handleError = require('../utils/handleError');

exports.createResponsable = async (req, res) => {
    const { nom, prenom, email, phone, mdp, organisation, sousOrganisation } = req.body;

    if (!nom) {
        return res.status(400).json({ error: 'Le nom est obligatoire.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'L\'email est obligatoire.' });
    }

    if (!mdp) {
        return res.status(400).json({ error: 'Le mot de passe est obligatoire.' });
    }

    if (!organisation && !sousOrganisation) {
        return res.status(400).json({ error: 'L\'organisation ou la sous-organisation doit être spécifiée.' });
    }

    try {
        const { user, role } = await searchRole(email);

        if (user) {
            return res.status(409).json({ error: `L'email existe déjà pour le rôle ${role}.` });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);

        const responsable = new Responsable({
            nom,
            prenom,
            email,
            phone,
            mdp: hashedPassword,
            organisation,
            sousOrganisation,
        });

        const createdResponsable = await responsable.save();

        if (sousOrganisation) {
            await SousOrganisation.findByIdAndUpdate(sousOrganisation, {
                responsable: createdResponsable._id,
            });
        } else if (organisation) {
            await Organisation.findByIdAndUpdate(organisation, {
                responsable: createdResponsable._id,
            });
        }

        res.status(201).json({
            id: createdResponsable._id,
            nom: createdResponsable.nom,
            prenom: createdResponsable.prenom,
            email: createdResponsable.email,
            phone: createdResponsable.phone,
            organisation: createdResponsable.organisation,
            sousOrganisation: createdResponsable.sousOrganisation,
        });

    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement du responsable: ' + error.message });
    }
};


exports.getAllResponsables = async (req, res) => {
    try {
        const responsables = await Responsable.find({})
            .populate('organisation', 'title')
            .populate('sousOrganisation', 'title')
            .populate('projects');
        res.status(200).json(responsables);
    } catch (error) {
        handleError(res, 400, 'Error fetching responsables: ' + error.message);
    }
};

exports.getResponsableById = async (req, res) => {
    const { id } = req.params;

    try {
        const responsable = await Responsable.findById(id)
            .populate('organisation', 'title') 
            .populate('sousOrganisation', 'title') 
            .populate('projects', 'title'); 

        if (responsable) {
            const response = {
                id: responsable._id,
                nom: responsable.nom,
                prenom: responsable.prenom,
                email: responsable.email,
                isLoggedIn: responsable.isLoggedIn,
                salary: responsable.salary,
                organisation: responsable.organisation ? responsable.organisation.title : null,
                sousOrganisation: responsable.sousOrganisation ? responsable.sousOrganisation.title : null,
                projects: {
                    count: responsable.projects.length,
                    titles: responsable.projects.map(project => project.title),
                },
            };

            res.status(200).json(response);
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching responsable: ' + error.message);
    }
};


exports.updateResponsable = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedResponsable = await Responsable.findByIdAndUpdate(id, updates, { new: true });
        if (updatedResponsable) {
            res.status(200).json(updatedResponsable);
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating responsable: ' + error.message);
    }
};

exports.deleteResponsable = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Responsable.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Responsable deleted successfully' });
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting responsable: ' + error.message);
    }
};
