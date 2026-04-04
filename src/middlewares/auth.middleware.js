const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../Utils/apiError');
const { findUserById } = require('../models/user.model');

async function authMiddleware(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authorization token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await findUserById(decoded.userId);

    if (!user) {
      throw new ApiError(401, 'Invalid token user');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Unauthorized access'));
  }
}

module.exports = authMiddleware;
