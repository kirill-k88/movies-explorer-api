const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { checkResult, checkDBValidationError } = require('../utils/validation');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(checkResult)
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return User.create(req.body);
    })
    .then((user) =>
      res.status(201).send({
        name: user.name,
        email: user.email,
      }),
    )
    .catch((err) => next(checkDBValidationError(err)));
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      next(checkDBValidationError(err));
    });
};

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'kilimanjaro',
        {
          expiresIn: '7d',
        },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          path: '/',
          /* domain: 'localhost', */
        })
        .send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.logout = (req, res) =>
  res.clearCookie('jwt').send({ answer: 'ok' });
