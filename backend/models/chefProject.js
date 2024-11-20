const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefProjectSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    mdp: { type: String, required: true },
    role: { type: String, default: 'chef' ,immutable: true},
    lastLogin: { type: Date },
    isLoggedIn: { type: Boolean, default: false },
    salary: { type: Number },

    project: { type: Schema.Types.ObjectId, ref: 'Project'},
    responsable: { type: Schema.Types.ObjectId, ref: 'Responsable' },
    membresEquipe: [{ type: Schema.Types.ObjectId, ref: 'MembreEquipe' }],
}, { timestamps: true });

const ChefProject = mongoose.models.ChefProject || mongoose.model('ChefProject', chefProjectSchema);

module.exports = ChefProject;
