const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
const handleError = require('../utils/handleError');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.jwt;
    if (!authHeader) return handleError(createError(401, 'Unauthorized'), res);

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return handleError(createError(403, 'Forbidden'), res);
        req.user = decoded.UserInfo;
        next();
    });
};

const checkRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return handleError(createError(403, 'Forbidden'), res);
    }
    next();
};

module.exports = { verifyToken, checkRole };
