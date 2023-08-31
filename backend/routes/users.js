const usersRouter = require('express').Router();
const {
  validateUpdateProfile,
} = require('../utils/validator');
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUpdateProfile, updateProfile);

module.exports = usersRouter;
