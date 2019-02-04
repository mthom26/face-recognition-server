const seedDb = async db => {
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

module.exports = { seedDb };
