const mongoose = require('mongoose');
const { Schema } = mongoose;

const riskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, required: true },
  probability: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  impact: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  mitigation: { type: String },
  status: { type: String, enum: ['Identified', 'Mitigated', 'Occurred'], default: 'Identified' }
}, { timestamps: true });

const Risk = mongoose.model('Risk', riskSchema);

module.exports = Risk;