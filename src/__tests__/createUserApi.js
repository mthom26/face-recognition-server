const axios = require('axios');

const API_URL = 'http://localhost:8000';

const createUser = async (name, email, password) => {
  return axios
    .post(`${API_URL}/signup`, {
      name,
      email,
      password
    })
    .catch(err => {
      // When axios receives a 400 response code it errors out before the tests
      // can run so the error is caught here and a resolved promise is passed
      // along with the original statusCode and message
      return Promise.resolve(err.response);
    });
};

module.exports = {
  createUser
};
