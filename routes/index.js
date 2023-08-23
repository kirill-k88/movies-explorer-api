const router = require('express').Router();

const {
  bodySigninValidator,
  bodySignupValidator,
} = require('../middlewares/celebrateValidation');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signin', bodySigninValidator, login);
router.post('/signout', logout);
router.post('/signup', bodySignupValidator, createUser);

module.exports = router;
