require('dotenv').config();

const express = require('express');
const db = require('./db');
const cors = require('cors');
const restaurantRouter = require('./routes/restaurantRouter');

const app = express();

// CORS
app.use(cors());

// app.use(bodyParser.json());
app.use(express.json());

// morgan middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// linking routes
app.use('/api/v1/restaurants', restaurantRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`I love you ${PORT}`);
});
