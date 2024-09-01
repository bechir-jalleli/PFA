const Admin = require('../models/admin');
const Responsable = require('../models/responsable');
const ChefProject = require('../models/chefProject');
const MembreEquipe = require('../models/membreEquipe');

async function searchRole(email) {
    try {
        const admin = await Admin.findOne({ email });
        if (admin) return { user: admin, role: 'admin' };

        const responsable = await Responsable.findOne({ email });
        if (responsable) return { user: responsable, role: 'responsable' };

        const chefProject = await ChefProject.findOne({ email });
        if (chefProject) return { user: chefProject, role: 'chefProject' };

        const membreEquipe = await MembreEquipe.findOne({ email });
        if (membreEquipe) return { user: membreEquipe, role: 'membreEquipe' };

        return { user: null, role: null };
    } catch (error) {
        console.error('Error in searchRole:', error);
        throw error;
    }
}

module.exports = searchRole;
