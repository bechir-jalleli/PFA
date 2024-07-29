const MembreEquipe = require('../models/membreEquipe');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

const generateAccessToken = (membreEquipe) => {
    return jwt.sign(
        { UserInfo: { id: membreEquipe._id, role: 'membreEquipe' } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (membreEquipe) => {
    return jwt.sign(
        { UserInfo: { id: membreEquipe._id, role: 'membreEquipe' } },
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
        const foundMembreEquipe = await MembreEquipe.findOne({ email }).exec();
        if (foundMembreEquipe) {
            return res.status(409).json({ error: 'MembreEquipe already exists' });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);
        const membreEquipe = new MembreEquipe({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdMembreEquipe = await membreEquipe.save();

        const accessToken = generateAccessToken(createdMembreEquipe);
        const refreshToken = generateRefreshToken(createdMembreEquipe);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            id: createdMembreEquipe._id,
            accessToken,
            email: createdMembreEquipe.email,
            nom: createdMembreEquipe.nom
        });

    } catch (error) {
        res.status(500).json({ error: 'Error registering membre equipe: ' + error.message });
    }
};

exports.login = async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return handleError(res, 400, 'Email and password are required');
    }

    try {
        const foundMembreEquipe = await MembreEquipe.findOne({ email }).exec();
        if (!foundMembreEquipe) {
            return handleError(res, 401, 'MembreEquipe does not exist');
        }

        const match = await bcrypt.compare(mdp, foundMembreEquipe.mdp);
        if (!match) {
            return handleError(res, 401, 'Wrong password');
        }

        const accessToken = generateAccessToken(foundMembreEquipe);
        const refreshToken = generateRefreshToken(foundMembreEquipe);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            email: foundMembreEquipe.email
        });

    } catch (error) {
        handleError(res, 500, 'Error logging in: ' + error.message);
    }
};

exports.refresh = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return handleError(res, 401, 'Unauthorized');
    }

    const refreshToken = cookies.jwt;
    try {
        const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const foundMembreEquipe = await MembreEquipe.findById(decoded.UserInfo.id).exec();
        if (!foundMembreEquipe) {
            return handleError(res, 401, 'Unauthorized');
        }

        const accessToken = generateAccessToken(foundMembreEquipe);

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

exports.getAllMembresEquipe = async (req, res) => {
    try {
        const membresEquipe = await MembreEquipe.find({});
        res.status(200).json(membresEquipe);
    } catch (error) {
        handleError(res, 400, 'Error fetching membres equipe: ' + error.message);
    }
};

exports.getMembreEquipeById = async (req, res) => {
    const { id } = req.params;

    try {
        const membreEquipe = await MembreEquipe.findById(id);
        if (membreEquipe) {
            res.status(200).json(membreEquipe);
        } else {
            handleError(res, 404, 'MembreEquipe not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching membre equipe: ' + error.message);
    }
};

exports.updateMembreEquipe = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedMembreEquipe = await MembreEquipe.findByIdAndUpdate(id, updates, { new: true });
        if (updatedMembreEquipe) {
            res.status(200).json(updatedMembreEquipe);
        } else {
            handleError(res, 404, 'MembreEquipe not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating membre equipe: ' + error.message);
    }
};

exports.deleteMembreEquipe = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await MembreEquipe.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'MembreEquipe deleted successfully' });
        } else {
            handleError(res, 404, 'MembreEquipe not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting membre equipe: ' + error.message);
    }
};
