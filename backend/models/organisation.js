    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const organisationSchema = new Schema({
        title: { type: String, required: true },  
        description: { type: String },
        chiffreAffaire: { type: Number },
        
        SousOrganisation: [{ type: Schema.Types.ObjectId, ref: 'SousOrganisation' }],
        responsable: { type: Schema.Types.ObjectId, ref: 'Responsable'}
    }, { timestamps: true });

    const Organisation = mongoose.model('Organisation', organisationSchema);
    module.exports = Organisation;
