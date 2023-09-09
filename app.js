const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./utils/limiter');

const {
  SERVER_DEFAULT_PORT,
  MONGODB_DEFAULT_CONNECTTION,
} = require('./utils/constants');

const {
  SERVER_PORT = SERVER_DEFAULT_PORT,
  MONGODB_CONNECTION = MONGODB_DEFAULT_CONNECTTION,
} = process.env;

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const indexRouter = require('./routes/index');

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const NotFoundError = require('./errorClasses/NotFoundError');

mongoose
  .connect(MONGODB_CONNECTION, {})
  .then(() => {
    console.log('Подключился к MongoDB:', MONGODB_CONNECTION);
  })
  .catch((err) => {
    console.log(`Не удалось подключиться к MongoDB. Ошибка:${err}`);
  });

const app = express();

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true, // reflect request origin
    credentials: true,
  }),
);
app.options('*', cors()); // enable pre-flight

app.use(indexRouter);

app.use(auth);

app.use(usersRouter);
app.use(moviesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Ошибка подписки на порт. Ошибка:${err}`);
  }
  console.log('Подключились к порту: ', SERVER_PORT);
});
