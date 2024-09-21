const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const searchRole = require('../utils/searchRole'); 
const handleError = require('../utils/handleError');

const generateAccessToken = (id, role) => {
    return jwt.sign({ UserInfo: { id, role } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (id, role) => {
    return jwt.sign({ UserInfo: { id, role } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { user, role } = await searchRole(email);
        if (!user) {
            return res.status(401).json({ error: 'Incorrect email' });
        }

        if (password !== user.mdp) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        user.lastLogin = new Date();
        user.isLoggedIn = true;
        await user.save();

        const accessToken = generateAccessToken(user._id, role);
        const refreshToken = generateRefreshToken(user._id, role);

        res.cookie('jwt', refreshToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        console.log({ accessToken, role, id: user._id });

        res.status(200).json({ accessToken, role, id: user._id });
    } catch (error) {
        handleError(res, 500, `Error logging in: ${error.message}`);
    }
};


exports.refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return handleError(res, 401, 'You should be logged in to refresh token');

    try {
        const decoded = await verifyToken(cookies.jwt, process.env.REFRESH_TOKEN_SECRET);
        const { id, role } = decoded.UserInfo;
        const models = { admin: Admin, responsable: Responsable, chefProject: ChefProject, membreEquipe: MembreEquipe };
        const user = await models[role]?.findById(id).exec();
        if (!user) return handleError(res, 401, 'User not found');
        
        const accessToken = generateAccessToken(user._id, role);
        res.json({ accessToken });
    } catch (error) {
        handleError(res, 403, `Failed to refresh token: ${error.message}`);
    }
};

exports.logout = async (req, res) => {
    const { userId, role } = req.body;

    if (!userId || !role) {
        return res.status(400).json({ error: 'User ID and role are required' });
    }

    try {
        const UserModel = getUserModelByRole(role);
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.isLoggedIn = false;
        await user.save();

        res.clearCookie('jwt', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None' 
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
