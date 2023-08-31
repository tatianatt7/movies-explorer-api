const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//
const { JWT_TOKEN_KEY, COOKIE_TOKEN_KEY } = require('../config');
const User = require('../models/users');
const {
  NotFoundError,
  UnauthorizedError,
} = require('../utils/errors');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new UnauthorizedError())
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(201).send({
      name,
      email,
    }))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN_KEY, { expiresIn: '7d' });
      res.cookie(COOKIE_TOKEN_KEY, token, { httpOnly: true });

      return res.send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie(COOKIE_TOKEN_KEY);
  res.send({ message: 'Выход пользователя' });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  createUser,
  login,
  logout,
};
