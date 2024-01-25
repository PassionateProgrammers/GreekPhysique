const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify user authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // Check if the decoded token contains the necessary information
    if (!decodedToken || !_id) {
      throw new Error('Invalid token structure');
    }

    req.user = await User.findOne({ _id: decodedToken._id }).select('_id');
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ error: 'Unauthorized request' });
  }
};

module.exports = requireAuth;
