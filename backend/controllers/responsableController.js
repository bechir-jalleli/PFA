const Responsable = require('../models/responsable');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

const generateAccessToken = (responsable) => {
    return jwt.sign(
        { UserInfo: { id: responsable._id, role: 'responsable' } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (responsable) => {
    return jwt.sign(
        { UserInfo: { id: responsable._id, role: 'responsable' } },
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

exports.register = async (req, res) =>  {
    const { nom, prenom, email, phone, mdp } = req.body;

    if (!nom || !email || !mdp) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const foundResponsable = await Responsable.findOne({ email }).exec();
        if (foundResponsable) {
            return res.status(409).json({ error: 'Responsable already exists' });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);
        const responsable = new Responsable({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdResponsable = await responsable.save();

        const accessToken = generateAccessToken(createdResponsable);
        const refreshToken = generateRefreshToken(createdResponsable);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            id: createdResponsable._id,
            accessToken,
            email: createdResponsable.email,
            nom: createdResponsable.nom
        });

    } catch (error) {
        res.status(500).json({ error: 'Error registering responsable: ' + error.message });
    }
};

exports.login = async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return handleError(res, 400, 'Email and password are required');
    }

    try {
        const foundResponsable = await Responsable.findOne({ email }).exec();
        if (!foundResponsable) {
            return handleError(res, 401, 'Responsable does not exist');
        }

        const match = await bcrypt.compare(mdp, foundResponsable.mdp);
        if (!match) {
            return handleError(res, 401, 'Wrong password');
        }

        const accessToken = generateAccessToken(foundResponsable);
        const refreshToken = generateRefreshToken(foundResponsable);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            email: foundResponsable.email
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

        const foundResponsable = await Responsable.findById(decoded.UserInfo.id).exec();
        if (!foundResponsable) {
            return handleError(res, 401, 'Unauthorized');
        }

        const accessToken = generateAccessToken(foundResponsable);

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

exports.getAllResponsables = async (req, res) => {
    try {
        const responsables = await Responsable.find({});
        res.status(200).json(responsables);
    } catch (error) {
        handleError(res, 400, 'Error fetching responsables: ' + error.message);
    }
};

exports.getResponsableById = async (req, res) => {
    const { id } = req.params;

    try {
        const responsable = await Responsable.findById(id);
        if (responsable) {
            res.status(200).json(responsable);
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching responsable: ' + error.message);
    }
};

exports.updateResponsable = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedResponsable = await Responsable.findByIdAndUpdate(id, updates, { new: true });
        if (updatedResponsable) {
            res.status(200).json(updatedResponsable);
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating responsable: ' + error.message);
    }
};

exports.deleteResponsable = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Responsable.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Responsable deleted successfully' });
        } else {
            handleError(res, 404, 'Responsable not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting responsable: ' + error.message);
    }
};
