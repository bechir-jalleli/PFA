const mongoose = require('mongoose');
const { Schema } = mongoose;

const responsableSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    mdp: { type: String, required: true },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' },
    sousOrganisation: { type: Schema.Types.ObjectId, ref: 'SousOrganisation' },
    chefProjects: [{ type: Schema.Types.ObjectId, ref: 'ChefProject' }],
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

responsableSchema.path('organisation').validate(function(value) {
  if (value && this.sousOrganisation) {
    return false;
  }
  if (!value && !this.sousOrganisation) {
    return false;
  }
  return true;
}, 'Either organisation or sousOrganisation must be provided, but not both.');

const Responsable = mongoose.model('Responsable', responsableSchema);
module.exports = Responsable;
