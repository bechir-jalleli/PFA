const mongoose = require('mongoose');
const { Schema } = mongoose;

const sousOrganisationSchema = new Schema({
    title: { type: String, required: true },  // Changed 'tittle' to 'title'
    description: { type: String },
    chiffreAffaire: { type: Number },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'Responsable', required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project', required: true }],
}, { timestamps: true });

const SousOrganisation = mongoose.model('SousOrganisation', sousOrganisationSchema);
module.exports = SousOrganisation;
