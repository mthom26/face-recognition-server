const db = require('../models');

const postSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: 'That user already exists!' });
    }

    const newUser = new db.User({
      name,
      email,
      password
    });
    await newUser.save();

    res.status(201).json({ message: 'Signed Up!' });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
    console.log(err);
  }
};

module.exports = { postSignUp };
