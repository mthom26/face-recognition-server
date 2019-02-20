const jwt = require('jsonwebtoken');

const db = require('../models');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'You must be logged in to do that' });
      } else {
        // Get user and add it to locals so no more database requests need to
        // be made
        const user = await db.User.findById(decoded.id);
        if (!user) {
          return res.status(500).json({ error: 'Sorry something went wrong.' });
        }
        res.locals.user = user;
        return next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'You must be logged in to do that' });
  }
};

module.exports = { isAuthenticated };
