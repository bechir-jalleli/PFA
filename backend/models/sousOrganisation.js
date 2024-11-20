const mongoose = require('mongoose');
const { Schema } = mongoose;

const sousOrganisationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    chiffreAffaire: { type: Number },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'Responsable', default: null ,required: true },

}, { timestamps: true });

const SousOrganisation = mongoose.models.SousOrganisation || mongoose.model('SousOrganisation', sousOrganisationSchema);
module.exports = SousOrganisation;
