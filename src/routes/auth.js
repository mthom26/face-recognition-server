const express = require('express');

const { postSignUp } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', postSignUp);

module.exports = router;
