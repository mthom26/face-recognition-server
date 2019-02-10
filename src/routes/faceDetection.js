const express = require('express');

const { detectFaces, uploadTest } = require('../controllers/faceDetection');

const router = express.Router();

router.get('/test', detectFaces);
router.post('/detect-faces', detectFaces);
router.post('/upload-test', uploadTest);

module.exports = router;
