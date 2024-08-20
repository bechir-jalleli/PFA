const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Responsable = require('../models/responsable');
const ChefProject = require('../models/chefProject');
const MembreEquipe = require('../models/membreEquipe');

const handleError = (res, status, message) => {
    res.status(status).json({ error: message });
};

const generateAccessToken = (id, role) => {
    return jwt.sign(
        { UserInfo: { id, role } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (id, role) => {
    return jwt.sign(
        { UserInfo: { id, role } },
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

const findUserByEmail = async (email) => {
    let user = null;
    let role = '';

    user = await Admin.findOne({ email }).exec();
    if (user) {
        role = 'admin';
    }

    if (!user) {
        user = await Responsable.findOne({ email }).exec();
        if (user) {
            role = 'responsable';
        }
    }

    if (!user) {
        user = await ChefProject.findOne({ email }).exec();
        if (user) {
            role = 'chefProject';
        }
    }

    if (!user) {
        user = await MembreEquipe.findOne({ email }).exec();
        if (user) {
            role = 'membreEquipe';
        }
    }

    return { user, role };
};

exports.login = async (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return handleError(res, 400, 'Email and password are required and should not be empty');
    }

    try {
        const { user, role } = await findUserByEmail(email);
        if (!user) {
            return handleError(res, 401, 'Wrong email');
        }

        //const correct = await bcrypt.compare(mdp, user.mdp);
        const correct = mdp === user.mdp;
        if (!correct) {
            return handleError(res, 401, 'Wrong password');
        }

        const accessToken = generateAccessToken(user._id, role);
        const refreshToken = generateRefreshToken(user._id, role);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        

        res.json({
            accessToken,
            email: user.email,
            role,
        });

    } catch (error) {
        handleError(res, 500, 'Error logging in: ' + error.message);
    }
};

exports.refresh = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return handleError(res, 401, 'You should be logged in to refresh token');
    }

    const refreshToken = cookies.jwt;
    try {
        const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const { id, role } = decoded.UserInfo;

        let user = null;
        switch (role) {
            case 'admin':
                user = await Admin.findById(id).exec();
                break;
            case 'responsable':
                user = await Responsable.findById(id).exec();
                break;
            case 'chefProject':
                user = await ChefProject.findById(id).exec();
                break;
            case 'membreEquipe':
                user = await MembreEquipe.findById(id).exec();
                break;
            default:
                return handleError(res, 401, 'Invalid role');
        }

        if (!user) {
            return handleError(res, 401, 'User not found');
        }

        const accessToken = generateAccessToken(user._id, role);
        res.json({ accessToken });

    } catch (error) {
        handleError(res, 403, 'Failed to refresh token: ' + error.message);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });

    res.json({ message: 'Logout success & Cookie cleared' });
};
