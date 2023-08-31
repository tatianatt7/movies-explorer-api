const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const validator = require('validator');
const { UnauthorizedError } = require('../utils/errors');
const { MESSAGE_ERROR_WRONG_USER_DATA } = require('../utils/constants');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    require: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    require: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(MESSAGE_ERROR_WRONG_USER_DATA));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(MESSAGE_ERROR_WRONG_USER_DATA));
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
