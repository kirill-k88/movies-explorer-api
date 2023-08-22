const router = require('express').Router();
const { bodyUserValidator } = require('../middlewares/celebrateValidation');

const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', bodyUserValidator, updateUser);

module.exports = router;
