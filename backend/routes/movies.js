const router = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../utils/validator');

router.get('/', getAllMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
