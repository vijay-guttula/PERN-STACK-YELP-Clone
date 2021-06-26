const express = require('express');
const restaurantRouter = express.Router();
const db = require('../db');

restaurantRouter.use(express.json());

// GET all restaurants
restaurantRouter.get('/', async (req, res) => {
  try {
    const results = await db.query('select * from restaurants');
    console.log(results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (e) {
    console.log(e.message);
  }
});

// Get a restaurant
restaurantRouter.get('/:restaurantId', async (req, res) => {
  try {
    // const results = await db.query(
    //   `select * from restaurants where id = ${req.params.restaurantId}`
    // ); as that can lead to sql injections

    // use paramaterized query over string concatinations
    const results = await db.query('select * from restaurants where id = $1', [
      req.params.restaurantId,
    ]);

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (e) {
    console.log(e.message);
  }
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
