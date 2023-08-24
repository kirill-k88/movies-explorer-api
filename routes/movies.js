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

router.get('/movies/', getAllMovies);
router.delete('/movies/:movieId', bodyMovieIdValidator, deleteMovie);
router.post('/movies/', bodyMovieValidator, createMovie);

module.exports = router;
