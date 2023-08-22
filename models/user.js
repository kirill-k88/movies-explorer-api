const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AuthError = require('../errorClasses/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthError('Неверные имя пользователя или пароль.'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthError('Неверные имя пользователя или пароль.'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
