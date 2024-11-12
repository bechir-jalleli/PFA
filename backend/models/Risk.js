const mongoose = require('mongoose');
const { Schema } = mongoose;

const riskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, required: true },
  impact: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  note: { type: String },
}, { timestamps: true });

const Risk = mongoose.models.Risk || mongoose.model('Risk', riskSchema);
module.exports = Risk;
