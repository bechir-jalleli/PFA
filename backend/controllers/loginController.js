const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const searchRole = require('../utils/searchRole'); // Import the searchRole function
const handleError = require('../utils/handleError');
;
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
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Use searchRole to find the user based on email
        const { user, role } = await searchRole(email);
        if (!user || !(await bcrypt.compare(password, user.mdp))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login time and set logged in status
        user.loginAt = new Date();
        user.isLoggedIn = true;
        await user.save();

        // Generate JWT tokens
        const accessToken = jwt.sign({ id: user._id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken, role, id: user._id });
    } catch (error) {
        handleError(res, 500, `Error logging in: ${error.message}`);
    }
};

// Handle logout
exports.logout = async (req, res) => {
    const { userId, role } = req.body; // Assuming userId and role are provided in request
    if (!userId || !role) {
        return res.status(400).json({ error: 'User ID and role are required' });
    }

    try {
        const UserModel = getUserModelByRole(role);
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update logged in status
        user.isLoggedIn = false;
        await user.save();

        res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};