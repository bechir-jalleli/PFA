const Risk = require('../models/Risk');
const Project = require('../models/Project');
const csv = require('csv-parser');
const { Readable } = require('stream');

exports.createRisk = async (req, res) => {
    try {
        await Risk.deleteMany({});
        
        await Project.updateMany({}, { risks: [] });

        if (req.file) {
            const results = [];
            const errors = [];
            const stream = Readable.from(req.file.buffer.toString());

            await new Promise((resolve, reject) => {
                stream
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => resolve())
                    .on('error', (error) => reject(error));
            });

            for (let row of results) {
                if (!row.project_id || !row.description || !row.impact || !row.note) {
                    errors.push(`Missing field in row: ${JSON.stringify(row)}`);
                    continue;
                }

                if (!['Low', 'Medium', 'High'].includes(row.impact)) {
                    errors.push(`Invalid impact value in row: ${JSON.stringify(row)}`);
                    continue;
                }

                const project = await Project.findById(row.project_id);
                if (!project) {
                    errors.push(`Project not found for ID: ${row.project_id}`);
                    continue;
                }
            }

            if (errors.length > 0) {
                return res.status(400).json({ message: 'Errors in CSV file', errors });
            }

            const newRisks = results.map(row => ({
                project: row.project_id,
                description: row.description,
                impact: row.impact,
                note: row.note
            }));

            const createdRisks = await Risk.insertMany(newRisks);

            for (let risk of createdRisks) {
                await Project.findByIdAndUpdate(risk.project, { $push: { risks: risk._id } });
            }

            res.status(201).json({ message: 'Risks uploaded successfully', count: createdRisks.length });
        } else {
            const risk = new Risk(req.body);
            const createdRisk = await risk.save();

            await Project.findByIdAndUpdate(createdRisk.project, { $push: { risks: createdRisk._id } });

            res.status(201).json(createdRisk);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRisks = async (req, res) => {
    try {
        const risks = await Risk.find().populate('project');
        res.status(200).json(risks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRisk = async (req, res) => {
    try {
        const risk = await Risk.findById(req.params.id).populate('project', 'name');
        if (!risk) {
            return res.status(404).json({ message: 'Risk not found' });
        }
        res.status(200).json(risk);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
