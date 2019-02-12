const path = require('path');
const fs = require('fs');

// Get image that the user uploaded and delete it after th response is sent
const getImage = async (req, res) => {
  const { name } = req.params;
  const filePath = path.resolve(__dirname + '/../../images/' + name);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: 'That file was not found!' });
  }

  res.sendFile(filePath, err => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong!' });
    } else {
      // Delete file after it is sent back to user to prevent files from
      // collecting on the server
      fs.unlink(filePath, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

module.exports = { getImage };
