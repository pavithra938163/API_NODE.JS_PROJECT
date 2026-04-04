const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../Utils/apiError');
const { createUser, findUserByEmail } = require('../models/user.model');

async function registerUser(payload) {
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await createUser({
    name: payload.name,
    email: payload.email,
    password: hashedPassword
  });

  return user;
}

async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

module.exports = {
  registerUser,
  loginUser
};
