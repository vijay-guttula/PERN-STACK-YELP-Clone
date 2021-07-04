import axios from 'axios';
require('dotenv').config();

export default axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/api/v1/restaurants'
      : 'https://pernstack-yelpclone.herokuapp.com/api/v1/restaurants',
});
