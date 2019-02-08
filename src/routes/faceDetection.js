const express = require('express');

const { detectFaces } = require('../controllers/faceDetection');

const router = express.Router();

router.get('/test', detectFaces);
router.post('/detect-faces', detectFaces);

module.exports = router;
