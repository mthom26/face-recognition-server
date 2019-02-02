require('dotenv').config();
const express = require('express');

const db = require('./models');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
