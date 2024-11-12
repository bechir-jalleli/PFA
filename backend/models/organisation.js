const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
    title: { type: String, required: true },  
    description: { type: String },
    chiffreAffaire: { type: Number },
    sousOrganisations: [{ type: Schema.Types.ObjectId, ref: 'SousOrganisation' }], // Corrected field name
    responsable: { type: Schema.Types.ObjectId, ref: 'Responsable' }
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', organisationSchema);
module.exports = Organisation;
