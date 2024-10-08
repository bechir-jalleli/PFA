const mongoose = require('mongoose');
const { Schema } = mongoose;

const membreEquipeSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String },
    mdp: { type: String, required: true }
}, { timestamps: true });

// Check if the model already exists
const MembreEquipe = mongoose.models.MembreEquipe || mongoose.model('MembreEquipe', membreEquipeSchema);

module.exports = MembreEquipe;
