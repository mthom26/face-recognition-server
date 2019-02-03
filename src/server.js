require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');
const authRoutes = require('./routes/auth');

const seedDb = async () => {
  console.log('seeding db');
  await db.User.deleteMany({});
  await db.User.create([
    {
      name: 'Matthew',
      email: 'matt@testmail.com',
      password: 'matt123'
    },
    {
      name: 'Jimmy',
      email: 'jimmy@testmail.com',
      password: 'muhpassword'
    },
    {
      name: 'Datboi',
      email: 'datboi@testmail.com',
      password: 'datboi'
    }
  ]);
};

const isTest = process.env.TEST_DB;
if (isTest) {
  // clear database for testing
  seedDb();
}

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
