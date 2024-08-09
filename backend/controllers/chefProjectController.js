const ChefProject = require('../models/chefProject');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getResponsableById } = require('./responsableController');  // Correctly import the function

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

const generateAccessToken = (chefProject) => {
    return jwt.sign(
        { UserInfo: { id: chefProject._id, role: 'chefProject' } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (chefProject) => {
    return jwt.sign(
        { UserInfo: { id: chefProject._id, role: 'chefProject' } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};

exports.register = async (req, res) => {
    const { nom, prenom, email, phone, mdp } = req.body;

    if (!nom || !email || !mdp) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        // Check if the email is already in use
        const foundChefProject = await ChefProject.findOne({ email }).exec();
        if (foundChefProject) {
            return res.status(409).json({ error: 'ChefProject already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // Create and save the new ChefProject
        const chefProject = new ChefProject({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdChefProject = await chefProject.save();

        // Send a success response
        res.status(201).json({
            id: createdChefProject._id,
            nom: createdChefProject.nom,
            prenom: createdChefProject.prenom,
            email: createdChefProject.email,
            phone: createdChefProject.phone,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering chef project: ' + error.message });
    }
};
    
exports.login = async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return handleError(res, 400, 'Email and password are required');
    }

    try {
        const foundChefProject = await ChefProject.findOne({ email }).exec();
        if (!foundChefProject) {
            return handleError(res, 401, 'Wrong email');
        }

        const match = await bcrypt.compare(mdp, foundChefProject.mdp);
        if (!match) {
            return handleError(res, 401, 'Wrong password');
        }

        const accessToken = generateAccessToken(foundChefProject);
        const refreshToken = generateRefreshToken(foundChefProject);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            email: foundChefProject.email
        });

    } catch (error) {
        handleError(res, 500, 'Error logging in: ' + error.message);
    }
};

exports.refresh = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return handleError(res, 401, 'You need to be logged in to refresh the token');
    }

    const refreshToken = cookies.jwt;
    try {
        const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const foundChefProject = await ChefProject.findById(decoded.UserInfo.id).exec();
        if (!foundChefProject) {
            return handleError(res, 401, 'ChefProject not found');
        }

        const accessToken = generateAccessToken(foundChefProject);

        res.json({ accessToken });
    } catch (error) {
        handleError(res, 403, 'Forbidden: ' + error.message);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });

    res.json({ message: 'Cookie cleared' });
};

exports.getAllChefProjects = async (req, res) => {
    try {
        const chefProjects = await ChefProject.find({});
        res.status(200).json(chefProjects);
    } catch (error) {
        handleError(res, 400, 'Error fetching chef projects: ' + error.message);
    }
};

exports.getChefProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const chefProject = await ChefProject.findById(id);
        if (chefProject) {
            res.status(200).json(chefProject);
        } else {
            handleError(res, 404, 'ChefProject not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching chef project: ' + error.message);
    }
};

exports.updateChefProject = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedChefProject = await ChefProject.findByIdAndUpdate(id, updates, { new: true });
        if (updatedChefProject) {
            res.status(200).json(updatedChefProject);
        } else {
            handleError(res, 404, 'ChefProject not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating chef project: ' + error.message);
    }
};

exports.deleteChefProject = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await ChefProject.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'ChefProject deleted successfully' });
        } else {
            handleError(res, 404, 'ChefProject not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting chef project: ' + error.message);
    }
};
