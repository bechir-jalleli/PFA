const mongoose = require('mongoose');
const { Schema } = mongoose;

const riskSchema = new Schema({
  description: { type: String, required: true },
  impact: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  note: { type: String },
  
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

const Risk = mongoose.models.Risk || mongoose.model('Risk', riskSchema);
module.exports = Risk;
