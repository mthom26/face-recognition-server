const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const db = require('../models');

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);

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

    transporter.sendMail({
      to: email,
      from: 'info@facefinder.com',
      subject: 'Welcome to FaceFinder App!',
      html: `<h1>Hello ${name}, you have successfully signed up for this app. Have fun!</h1>`
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

const postPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.User.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: 'Sorry something went wrong.' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    res.status(200).json({ message: `Reset email sent to ${email}` });

    transporter.sendMail({
      to: email,
      from: 'info@facefinder.com',
      subject: 'Password Reset',
      html: `
        <p>A password reset has been requested for this email.</p>
        <p>Click <a href="http://localhost:3000/password-reset/${token}">this link</a> to reset your password.</p>
      `
    });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
  }
};

const postNewPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await db.User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(500).json({ error: 'Password reset token timed out.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({
      message: 'Password reset successfully.',
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
  }
};

module.exports = { postSignUp, postLogin, postPasswordReset, postNewPassword };
