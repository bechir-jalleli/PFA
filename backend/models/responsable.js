const mongoose = require('mongoose');
const { Schema } = mongoose;

const responsableSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    mdp: { type: String, required: true },
    role: { type: String, default: 'responsable' },
    lastLogin: { type: Date },
    isLoggedIn: { type: Boolean, default: false },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' },
    sousOrganisation: { type: Schema.Types.ObjectId, ref: 'SousOrganisation' },
    chefProjects: [{ type: Schema.Types.ObjectId, ref: 'ChefProject' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project', required: true }],
    salary: { type: Number } 
}, { timestamps: true });


const Responsable = mongoose.models.Responsable || mongoose.model('Responsable', responsableSchema);

module.exports = Responsable;
