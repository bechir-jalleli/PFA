const mongoose = require('mongoose');
const { Schema } = mongoose;

const tacheSchema = new Schema({
    tittle: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    chefProject: { type: Schema.Types.ObjectId, ref: 'ChefProject', },
    membreEquipe: { type: Schema.Types.ObjectId, ref: 'MembreEquipe' },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project', required: true }]
}, { timestamps: true });

const Tache = mongoose.model('Tache', tacheSchema);
module.exports = Tache;
