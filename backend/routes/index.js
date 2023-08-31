const router = require('express').Router();
const { NotFoundError } = require('../utils/errors');
const { validateSignIn, validateSignUp } = require('../utils/validator');
const { logout, login, createUser } = require('../controllers/users');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.use(require('../middlewares/auth'));

router.delete('/signout', logout);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (_, __, next) => {
  next(new NotFoundError('Запрашиваемый эндпоинт не найден'));
});

module.exports = router;
