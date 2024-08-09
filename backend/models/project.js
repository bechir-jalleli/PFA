const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', default: null },
    sousOrganisation: { type: Schema.Types.ObjectId, ref: 'SousOrganisation', default: null },
    chefProject: { type: Schema.Types.ObjectId, ref: 'ChefProject', default: null }, // Added reference to ChefProject
    startDate: { type: Date },
    endDate: { type: Date },
    budget: { type: Number }, 
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
