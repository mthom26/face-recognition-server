const express = require('express');

const { postSignUp, postLogin } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', postSignUp);
router.post('/login', postLogin);

module.exports = router;
