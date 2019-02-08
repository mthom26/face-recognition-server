const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'You must be logged in to do that' });
      } else {
        return next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'You must be logged in to do that' });
  }
};

module.exports = { isAuthenticated };
