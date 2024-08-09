const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', organisationSchema);
module.exports = Organisation;
