const router = require('express').Router();
const {
  bodyMovieIdValidator,
  bodyMovieValidator,
} = require('../middlewares/celebrateValidation');

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);
router.delete('/:movieId', bodyMovieIdValidator, deleteMovie);
router.post('/', bodyMovieValidator, createMovie);

module.exports = router;
