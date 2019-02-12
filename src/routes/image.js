const express = require('express');

const { getImage } = require('../controllers/image');

const router = express.Router();

router.get('/images/:name', getImage);

module.exports = router;
