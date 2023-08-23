const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 180,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 180,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 180,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 180,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
