    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const adminSchema = new Schema({
        nom: { type: String, required: true },
        prenom: { type: String },
        email: { type: String, unique: true },
        phone: { type: String },
        mdp: { type: String }
    }, { timestamps: true });

    const Admin = mongoose.model('Admin', adminSchema);
    module.exports = Admin;
