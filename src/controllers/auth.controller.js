const { registerSchema, loginSchema } = require('../validations/auth.validation');
const { registerUser, loginUser } = require('../services/auth.service');

async function register(req, res) {
  const parsedBody = registerSchema.parse(req.body);
  const user = await registerUser(parsedBody);

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user
  });
}

async function login(req, res) {
  const parsedBody = loginSchema.parse(req.body);
  const result = await loginUser(parsedBody);

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result
  });
}

module.exports = {
  register,
  login
};
