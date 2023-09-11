const { celebrate, Joi } = require('celebrate');
const {
  REGXP_URL,
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
} = require('../utils/constants');

module.exports.bodySigninValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message(INVALID_EMAIL_MESSAGE),
    password: Joi.string().required().min(7).message(INVALID_PASSWORD_MESSAGE),
  }),
});

module.exports.bodySignupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.bodyMovieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number(),
  }),
});

module.exports.bodyMovieValidator = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().regex(REGXP_URL),
    thumbnail: Joi.string().required().regex(REGXP_URL),
    movieId: Joi.number().required(),
    image: Joi.string().required().regex(REGXP_URL),
  }),
});

module.exports.bodyUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});
