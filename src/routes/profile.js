const express = require('express');

const { getProfile } = require('../controllers/profile');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/profile', isAuthenticated, getProfile);

module.exports = router;
