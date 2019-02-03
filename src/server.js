require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const authRoutes = require('./routes/auth');

const clearDb = async () => {
  console.log('clearing db');
  await db.User.deleteMany({});
};

const isTest = process.env.TEST_DB;
if (isTest) {
  // clear database for testing
  clearDb();
}

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
