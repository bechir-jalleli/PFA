const mongoose = require('mongoose');
const { Schema } = mongoose;

const sousOrganisationSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
}, { timestamps: true });

const SousOrganisation = mongoose.model('SousOrganisation', sousOrganisationSchema);
module.exports = SousOrganisation;
