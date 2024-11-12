const mongoose = require('mongoose');
const { Schema } = mongoose;

const tacheSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    membreEquipe: { type: Schema.Types.ObjectId, ref: 'MembreEquipe', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

const Tache = mongoose.models.Tache || mongoose.model('Tache', tacheSchema);
module.exports = Tache;
