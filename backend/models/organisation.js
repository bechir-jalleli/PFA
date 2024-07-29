const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', organisationSchema);
module.exports = Organisation;
