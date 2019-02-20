const express = require('express');

const { isAuthenticated } = require('../middleware/isAuthenticated');

const {
  detectFacesWithUrl,
  detectFacesWithBase64
} = require('../controllers/faceDetection');

const router = express.Router();

// router.get('/test', detectFacesWithUrl);
router.post('/detect-faces', isAuthenticated, detectFacesWithUrl);
router.post('/upload-test', isAuthenticated, detectFacesWithBase64);

module.exports = router;
