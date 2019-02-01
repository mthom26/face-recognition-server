const express = require('express');

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello'
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
