// utils/handleError.js
module.exports = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};
