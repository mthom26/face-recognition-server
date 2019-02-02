const express = require('express');

const { postSignUp } = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello'
  });
});

router.get('/about', (req, res) => {
  res.json({
    message: 'About'
  });
});

router.post('/signup', postSignUp);

module.exports = router;
