const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const searchRole = require('../utils/searchRole');
const handleError = require('../utils/handleError');

const generateAccessToken = (id, role) => {
  return jwt.sign({ UserInfo: { id, role } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
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

    console.log({ accessToken, role, id: user._id });

    res.status(200).json({ accessToken, role, id: user._id });
  } catch (error) {
    handleError(res, 500, `Error logging in: ${error.message}`);
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

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
