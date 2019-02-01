const express = require('express');

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

module.exports = router;
