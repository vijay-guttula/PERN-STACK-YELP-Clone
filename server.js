require('dotenv').config();

const express = require('express');
const cors = require('cors');
const restaurantRouter = require('./routes/restaurantRouter');
const path = require('path');

const app = express();

// CORS
app.use(cors());

// Body parsing i.e for req.body
app.use(express.json());

// morgan middleware
const morgan = require('morgan');
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// linking routes
app.use('/api/v1/restaurants', restaurantRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`I love you ${PORT}`);
});
