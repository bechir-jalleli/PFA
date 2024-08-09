const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

const generateAccessToken = (admin) => {
    return jwt.sign(
        { UserInfo: { id: admin._id, role: 'admin' } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (admin) => {
    return jwt.sign(
        { UserInfo: { id: admin._id, role: 'admin' } },
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
        const foundAdmin = await Admin.findOne({ email }).exec();
        if (foundAdmin) {
            return res.status(409).json({ error: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);
        const admin = new Admin({ nom, prenom, email, phone, mdp: hashedPassword });
        const createdAdmin = await admin.save();


        res.status(201).json({
            id: createdAdmin._id,
            nom: createdAdmin.nom,
            prenom:createdAdmin.prenom,
            email: createdAdmin.email,
            phone: createdAdmin.phone,
            mdp: createdAdmin.mdp,
        });

    } catch (error) {
        res.status(500).json({ error: 'Error registering admin: ' + error.message });
    }
};

exports.login = async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return handleError(res, 400, 'Email and password are required should be not empty');
    }

    try {
        const foundAdmin = await Admin.findOne({ email }).exec();
        if (!foundAdmin) {
            return handleError(res, 401, 'Wrong email');
        }

        const match = await bcrypt.compare(mdp, foundAdmin.mdp);
        if (!match) {
            return handleError(res, 401, 'Wrong password');
        }

        const accessToken = generateAccessToken(foundAdmin);
        const refreshToken = generateRefreshToken(foundAdmin);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            email: foundAdmin.email
        });

    } catch (error) {
        handleError(res, 500, 'Error logging in: ' + error.message);
    }
};

exports.refresh = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return handleError(res, 401, 'you should loggin to refresh token');
    }

    const refreshToken = cookies.jwt;
    try {
        const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const foundAdmin = await Admin.findById(decoded.UserInfo.id).exec();
        if (!foundAdmin) {
            return handleError(res, 401, 'this Amin (ID) doesnt exist');
        }

        const accessToken = generateAccessToken(foundAdmin);

        res.json({ accessToken });
    } catch (error) {
        handleError(res, 403, 'you dont have access: ' + error.message);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });

    res.json({ message: 'logout success & Cookie cleared' });
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.status(200).json(admins);
    } catch (error) {
        handleError(res, 400, 'Error fetching admins: ' + error.message);
    }
};

exports.getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (admin) {
            res.status(200).json(admin);
        } else {
            handleError(res, 404, 'Admin not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error fetching admin: ' + error.message);
    }
};

exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, { new: true });
        if (updatedAdmin) {
            res.status(200).json(updatedAdmin);
        } else {
            handleError(res, 404, 'Admin not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error updating admin: ' + error.message);
    }
};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Admin.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Admin deleted successfully' });
        } else {
            handleError(res, 404, 'Admin not found');
        }
    } catch (error) {
        handleError(res, 400, 'Error deleting admin: ' + error.message);
    }
};

