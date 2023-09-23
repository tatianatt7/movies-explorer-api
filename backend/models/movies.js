const { Schema, model } = require('mongoose');
const validator = require('validator');

const moviesSchema = new Schema({
  country: {
    type: String,
    required: [true, 'поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'поле "director" должно быть заполнено'],
  },
  duration: {
    type: String,
    required: [true, 'поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    description: [true, 'поле "image" должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL-адрес',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'поле "trailerLink" должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    reqired: [true, 'поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL-адрес',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'поле "owner" должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'поле "nameEN" должно быть заполнено'],
  },
}, {
  versionKey: false,
});
module.exports = model('movies', moviesSchema);
