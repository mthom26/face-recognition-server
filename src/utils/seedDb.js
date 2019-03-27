const bcrypt = require('bcrypt');

const seedDb = async db => {
  console.log('seeding db');
  await db.User.deleteMany({});
  await db.User.create([
    {
      name: 'Matthew',
      email: 'matt@testmail.com',
      password: bcrypt.hashSync('pw', 10)
    },
    {
      name: 'Jimmy',
      email: 'jimmy@testmail.com',
      password: bcrypt.hashSync('pw', 10)
    },
    {
      name: 'Datboi',
      email: 'datboi@testmail.com',
      password: bcrypt.hashSync('pw', 10)
    }
  ]);
};

module.exports = { seedDb };
