const User = require('../models/user');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(201).json({ user: { name: user.name }, token });
});

const login = asyncWrapper(async (req, res, next) => {
    try {
        
    
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createCustomError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createCustomError('Invalid credentials', 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(createCustomError('Invalid credentials', 401));
  }

  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
        next(error)
    }
})

module.exports = { register, login }
