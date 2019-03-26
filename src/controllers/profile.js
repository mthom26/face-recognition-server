const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
  try {
    const { user } = res.locals;

    if (!user) {
      return res.status(500).json({ error: 'Sorry something went wrong.' });
    }

    res.status(200).json({
      message: 'Got Profile',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
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

const updateName = async (req, res) => {
  try {
    const { newName } = req.body;
    const { user } = res.locals;
    if (!user) {
      return res.status(500).json({ error: 'Sorry something went wrong.' });
    }
    user.name = newName;
    await user.save();

    res.status(200).json({
      message: 'Updated Name',
      data: user.name
    });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
    console.log(err);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const { user } = res.locals;
    if (!user) {
      return res.status(500).json({ error: 'Sorry something went wrong.' });
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'That password is incorrect.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: 'Updated Password' });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
    console.log(err);
  }
};

module.exports = { getProfile, updateName, updatePassword };
