const mongoose = require('mongoose');
const { Schema } = mongoose;

const tacheSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    chefProject: { type: Schema.Types.ObjectId, ref: 'ChefProject', },
    assignee: { type: Schema.Types.ObjectId, ref: 'MembreEquipe' }
}, { timestamps: true });

const Tache = mongoose.model('Tache', tacheSchema);
module.exports = Tache;
