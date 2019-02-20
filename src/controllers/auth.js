const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');

const postSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: 'That user already exists!' });
    }
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new db.User({
      name,
      email,
      password: hashed
    });
    await newUser.save();

    const id = newUser._id.toString();
    const token = await jwt.sign(
      {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email
      },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    );

    res.status(201).json({
      message: 'Signed Up!',
      token,
      user: {
        name,
        email,
        id,
        dateJoined: newUser.dateJoined,
        dateLastLogin: newUser.dateLastLogin,
        imageSubmissions: newUser.imageSubmissions
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
    console.log(err);
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'That email/password is incorrect.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: 'That email/password is incorrect.' });
    }

    const id = user._id.toString();
    const name = user.name;
    const token = await jwt.sign(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    );

    res.status(200).json({
      message: 'Logged In!',
      token,
      user: {
        name,
        email,
        id,
        dateJoined: user.dateJoined,
        dateLastLogin: user.dateLastLogin,
        imageSubmissions: user.imageSubmissions
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
    console.log(err);
  }
};

module.exports = { postSignUp, postLogin };
