const express = require('express');

const {
  getProfile,
  updateDetails,
  updatePassword
} = require('../controllers/profile');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

router.post('/profile', isAuthenticated, getProfile);
router.post('/update-details', isAuthenticated, updateDetails);
router.post('/update-password', isAuthenticated, updatePassword);

module.exports = router;
