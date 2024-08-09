const mongoose = require('mongoose');
const { Schema } = mongoose;

const chefProjectSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    mdp: { type: String, required: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'Responsable',  },
    membresEquipe: [{ type: Schema.Types.ObjectId, ref: 'MembreEquipe' }],
    taches: [{ type: Schema.Types.ObjectId, ref: 'Tache' }]
}, { timestamps: true });

const ChefProject = mongoose.model('ChefProject', chefProjectSchema);
module.exports = ChefProject;
