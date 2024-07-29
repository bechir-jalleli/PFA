const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' },
    sousOrganisation: { type: Schema.Types.ObjectId, ref: 'SousOrganisation' },
    startDate: { type: Date },
    endDate: { type: Date },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
