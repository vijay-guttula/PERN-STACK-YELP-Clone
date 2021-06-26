const express = require('express');
const restaurantRouter = express.Router();
const db = require('../db');

restaurantRouter.use(express.json());

// GET all restaurants
restaurantRouter.get('/', async (req, res) => {
  const results = await db.query('select * from restaurants');
  console.log(results);
  res.send();
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
