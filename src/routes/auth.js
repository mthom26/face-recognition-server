const express = require('express');

const {
  postSignUp,
  postLogin,
  postPasswordReset,
  postNewPassword
} = require('../controllers/auth');

const router = express.Router();

router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.post('/password-reset', postPasswordReset);
router.post('/password-reset/:token', postNewPassword);

module.exports = router;
