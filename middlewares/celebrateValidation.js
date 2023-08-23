const { celebrate, Joi } = require('celebrate');
const { REGXP_URL } = require('../utils/constants');

module.exports.bodySigninValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Передано некорректное значение email'),
    password: Joi.string()
      .required()
      .min(7)
      .message('Передан некорректный пароль'),
  }),
});

module.exports.bodySignupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.bodyMovieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().message('Передан некорректный id'),
  }),
});

module.exports.bodyMovieValidator = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required().min(2).max(180),
    nameEN: Joi.string().required().min(2).max(180),
    country: Joi.string().required().min(2).max(180),
    director: Joi.string().required().min(2).max(180),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().regex(REGXP_URL),
    thumbnail: Joi.string().required().regex(REGXP_URL),
    movieId: Joi.number(),
    image: Joi.string().required().regex(REGXP_URL),
    owner: Joi.string().length(24).hex().message('Передан некорректный id'),
  }),
});

module.exports.bodyUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});
