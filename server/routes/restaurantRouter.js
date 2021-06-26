const express = require('express');
const restaurantRouter = express.Router();

restaurantRouter.use(express.json());

// GET all restaurants
restaurantRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: ['A', 'B'],
    },
  });
});

// Get a restaurant
restaurantRouter.get('/:restaurantId', (req, res) => {
  res.send(req.params);
});

// create a restaurant
restaurantRouter.post('/', (req, res) => {
  res.send(req.body);
});

// update a restaurant
restaurantRouter.put('/:restaurantId', (req, res) => {
  res.send(req.params);
});

// delete a restaurant
restaurantRouter.delete('/:restaurantId', (req, res) => {
  res.send(req.params);
});

module.exports = restaurantRouter;
