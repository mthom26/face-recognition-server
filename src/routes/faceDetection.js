const express = require('express');

const {
  detectFacesWithUrl,
  detectFacesWithBase64
} = require('../controllers/faceDetection');

const router = express.Router();

router.get('/test', detectFacesWithUrl);
router.post('/detect-faces', detectFacesWithUrl);
router.post('/upload-test', detectFacesWithBase64);

module.exports = router;
