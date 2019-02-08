const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(`Could not connect to Database: ${process.env.DATABASE_URI}`);
    console.log(err);
  } else {
    console.log(`Connected to Database: ${process.env.DATABASE_URI}`);
  }
});

module.exports.User = require('./user');
