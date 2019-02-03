const axios = require('axios');

const API_URL = 'http://localhost:8000';

const createUser = async () => {
  return axios.post(`${API_URL}/signup`, {
    name: 'Jimbo',
    email: 'jimbo@testmail.com',
    password: 'muhpassword'
  });
};

module.exports = {
  createUser
};
