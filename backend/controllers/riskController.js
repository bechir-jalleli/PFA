const mongoose = require('mongoose');
const Risk = require('../models/risk');
const Project = require('../models/project');
const handleError = require('../utils/handleError');
const csv = require('csv-parser');
const fs = require('fs');

exports.createRisks = async (req, res) => {
    const risks = [];
    const { projectId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ error: 'Invalid project ID' });
    }

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            risks.push({
                project: projectId,
                description: row.description,
                probability: row.probability,
                impact: row.impact,
                mitigation: row.mitigation,
            });
        })
        .on('end', async () => {
            try {
                await Risk.insertMany(risks);
                res.status(201).json({ message: 'Risks created successfully', risks });
            } catch (error) {
                handleError(res, 400, `Error creating risks: ${error.message}`);
            }
        });
};

exports.getRiskById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid risk ID' });
        }
        const risk = await Risk.findById(id);
        if (!risk) return handleError(res, 404, 'Risk not found');
        res.status(200).json(risk);
    } catch (error) {
        handleError(res, 400, `Error fetching risk: ${error.message}`);
    }
};
