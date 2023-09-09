const Movie = require('../models/movies');
const {
  checkResultFindMovie,
  checkDBValidationError,
} = require('../utils/validation');

module.exports.getAllMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .then((movie) => checkResultFindMovie(movie, req.user._id))
    .then(() => Movie.deleteOne({ movieId: req.params.movieId }))
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    movieId,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailerLink,
    image,
    thumbnail,
  } = req.body;
  const owner = req.user;
  Movie.create({
    movieId,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailerLink,
    image,
    thumbnail,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      next(checkDBValidationError(err));
    });
};
