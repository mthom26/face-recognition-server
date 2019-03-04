const express = require('express');

const { getProfile, updateName } = require('../controllers/profile');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/profile', isAuthenticated, getProfile);
router.post('/update-name', isAuthenticated, updateName);

module.exports = router;
