const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    nom: { type: String },
    prenom: { type: String },
    email: { type: String, unique: true, default: 'admin@gmail.com' },
    phone: { type: String },
    mdp: { type: String, default: 'admin' },
    role: { type: String, default: 'admin' },
    image: { type: Buffer }, 
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
