const router = require('express').Router();
const { bodyUserValidator } = require('../middlewares/celebrateValidation');

const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/users/me/', getCurrentUser);
router.patch('/users/me/', bodyUserValidator, updateUser);

module.exports = router;
