require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const faceRoutes = require('./routes/faceDetection');
const { seedDb } = require('./utils/seedDb');
// const { detectFaces } = require('./controllers/faceDetection');

const isTest = process.env.TEST_DB;
if (isTest) {
  // clear database for testing
  seedDb(db);
}

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(profileRoutes);
app.use(faceRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
