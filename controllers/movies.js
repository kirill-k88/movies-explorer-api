const Movie = require('../models/movies');
const {
  checkResult,
  checkResultFindMovie,
  checkDBValidationError,
} = require('../utils/validation');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .then((movie) => checkResultFindMovie(movie, req.user._id))
    .then(() => Movie.deleteOne({ _id: req.params.movieId }))
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Movie.create({ name, link, owner })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      next(checkDBValidationError(err));
    });
};

module.exports.likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then(checkResult)
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then(checkResult)
    .then((movie) => res.send(movie))
    .catch(next);
};
