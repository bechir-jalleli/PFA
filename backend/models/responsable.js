const mongoose = require('mongoose');
const { Schema } = mongoose;

const responsableSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    mdp: { type: String, required: true },
    role: { type: String, default: 'responsable' ,immutable: true},
    lastLogin: { type: Date },
    isLoggedIn: { type: Boolean, default: false },
    salary: { type: Number },

    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' , },
    sousOrganisation: { type: Schema.Types.ObjectId, ref: 'SousOrganisation' , },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
}, { timestamps: true });

const Responsable = mongoose.models.Responsable || mongoose.model('Responsable', responsableSchema);
module.exports = Responsable;
