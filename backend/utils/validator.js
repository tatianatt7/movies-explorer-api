const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP } = require('./constants');

module.exports = {
  validateSignUp: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),

  validateSignIn: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),

  validateUpdateProfile: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
  }),

  validateCreateMovie: celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(URL_REGEXP),
      trailerLink: Joi.string().required().regex(URL_REGEXP),
      thumbnail: Joi.string().required().regex(URL_REGEXP),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
      // owner: Joi.string().required(),
    }),
  }),

  validateDeleteMovie: celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().required(),
    }),
  }),
};
