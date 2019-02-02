const db = require('../models');

const postSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.findOne({ email: email });

    if (user) {
      return res.json({ message: 'That user already exists!' });
    }

    const newUser = new db.User({
      name,
      email,
      password
    });
    await newUser.save();

    res.json({ message: 'Signed Up!' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postSignUp };
