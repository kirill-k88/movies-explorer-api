module.exports.REGXP_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;

module.exports.REGXP_EMAIL = /^\S+@\S+\.\S+$/;

module.exports.MONGODB_DEFAULT_CONNECTTION = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports.SERVER_DEFAULT_PORT = 4000;

module.exports.WRONG_LOGIN_MESSAGE = 'Неверные имя пользователя или пароль.';

module.exports.INVALID_EMAIL_MESSAGE = 'Передано некорректное значение email.';

module.exports.INVALID_PASSWORD_MESSAGE = 'Передан некорректный пароль.';

module.exports.INVALID_ID_MESSAGE = 'Передан некорректный id.';

module.exports.UNAUTHORIZED_MESSAGE = 'Необходима авторизация.';

module.exports.SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';

module.exports.FIND_NODATA_MESSAGE = 'Данных по указанному _id не найдено.';

module.exports.WRONG_OWNER_MESSAGE = 'Фильм по указанному _id принадлежит другому пользователю.';

module.exports.DUPLICATE_ERROR_MESSAGE = 'Ошибка валидации в БД. Данные с указанными полями уже существуют в БД.';

module.exports.VALIDATION_ERROR_MESSAGE = 'Ошибка валидации данных в БД.';
