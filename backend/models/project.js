const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    tittle: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    budget: { type: Number },
    revenue: { type: Number }, 
    status: { type: String, enum: ['In Progress', 'Completed', 'Delayed'], required: true },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', default: null },
    sousOrganisation: { type: Schema.Types.ObjectId, ref: 'SousOrganisation', default: null },
    chefProject: { type: Schema.Types.ObjectId, ref: 'ChefProject', default: null }, 
    responsable: { type: Schema.Types.ObjectId, ref: 'Responsable' }, 
    membreEquipe: [{ type: Schema.Types.ObjectId, ref: 'MembreEquipe' }],
    taches: [{ type: Schema.Types.ObjectId, ref: 'Tache' }]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
