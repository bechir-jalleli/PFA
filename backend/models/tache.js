const mongoose = require('mongoose');
const { Schema } = mongoose;

const tacheSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignee: { type: Schema.Types.ObjectId, ref: 'MembreEquipe' },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Tache = mongoose.model('Tache', tacheSchema);
module.exports = Tache;
