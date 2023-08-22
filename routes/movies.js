const router = require('express').Router();
const {
  bodyMovieIdValidator,
  bodyMovieValidator,
} = require('../middlewares/celebrateValidation');

const {
  getAllMovies,
  createMovie,
  deleteMovie,
  likeMovie,
  dislikeMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);
router.delete('/:movieId', bodyMovieIdValidator, deleteMovie);
router.post('/', bodyMovieValidator, createMovie);
router.put('/:movieId/likes', bodyMovieIdValidator, likeMovie);
router.delete('/:movieId/likes', bodyMovieIdValidator, dislikeMovie);

module.exports = router;
