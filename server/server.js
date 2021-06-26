require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const restaurantRouter = require('./routes/restaurantRouter');

// morgan middleware
app.use(morgan('dev'));

// linking routes
app.use('/api/v1/restaurants', restaurantRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`I love you ${PORT}`);
});
