const ALLOWED_SOURCES = [
  'https://movie-searcher.nomoredomainsicu.ru',
  'http://movie-searcher.nomoredomainsicu.ru',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (ALLOWED_SOURCES.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  return next();
};
