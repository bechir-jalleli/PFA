    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const membreEquipeSchema = new Schema({
        nom: { type: String, required: true },
        prenom: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        role: { type: String, default: 'membre' ,immutable: true},
        lastLogin: { type: Date },
        isLoggedIn: { type: Boolean, default: false },
        mdp: { type: String ,default: 'membre'},
        salary: { type: Number },


        chefProject: { type: Schema.Types.ObjectId, ref: 'ChefProject' },
        taches: [{ type: Schema.Types.ObjectId, ref: 'Tache' }],

    }, { timestamps: true });

    const MembreEquipe = mongoose.models.MembreEquipe || mongoose.model('MembreEquipe', membreEquipeSchema);
    module.exports = MembreEquipe;
