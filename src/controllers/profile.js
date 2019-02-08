const getProfile = async (req, res) => {
  try {
    res.status(200).json({ message: 'Got Profile' });
  } catch (err) {
    res.status(500).json({ error: 'Sorry something went wrong.' });
    console.log(err);
  }
};

module.exports = { getProfile };
