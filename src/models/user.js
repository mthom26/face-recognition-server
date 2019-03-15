const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    required: true,
    default: Date.now()
  },
  dateLastLogin: {
    type: Date,
    required: true,
    default: Date.now()
  },
  imageSubmissions: {
    type: Number,
    required: true,
    default: 0
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
