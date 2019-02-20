const db = require('../models');

const getProfile = async (req, res) => {
  try {
    const user = await db.User.findOne({ email: req.body.email });

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

module.exports = { getProfile };
