require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const db = require('./models');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const faceRoutes = require('./routes/faceDetection');
const { seedDb } = require('./utils/seedDb');
// const { detectFaces } = require('./controllers/faceDetection');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    //accept file
    cb(null, true);
  } else {
    // reject file
    cb(null, false);
  }
};

const isTest = process.env.TEST_DB;
if (isTest) {
  // clear database for testing
  seedDb(db);
}

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use(
  '/images',
  express.static(path.join(path.dirname(process.mainModule.filename), 'images'))
);

app.use(authRoutes);
app.use(profileRoutes);
app.use(faceRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
