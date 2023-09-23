const Movies = require('../models/movies');
const {
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors');

const {
  MESSAGE_ERROR_MOVIES_NOT_FOUND, HTTP_STATUS_CREATED,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch(next);
};

const getAllMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies.reverse());
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movies.findById(movieId)
    .orFail(() => new NotFoundError(MESSAGE_ERROR_MOVIES_NOT_FOUND))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError());
      }

      return movie.deleteOne()
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
