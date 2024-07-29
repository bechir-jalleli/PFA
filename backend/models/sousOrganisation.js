const mongoose = require('mongoose');
const { Schema } = mongoose;

const sousOrganisationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const SousOrganisation = mongoose.model('SousOrganisation', sousOrganisationSchema);
module.exports = SousOrganisation;
