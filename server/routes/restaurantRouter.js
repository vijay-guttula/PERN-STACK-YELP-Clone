const express = require('express');
const restaurantRouter = express.Router();
const db = require('../db');

// GET all restaurants
restaurantRouter.get('/', async (req, res) => {
  try {
    const results = await db.query('select * from restaurants');
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

// Get a restaurant
restaurantRouter.get('/:restaurantId', async (req, res) => {
  try {
    // use paramaterized query over string concatinations to prevent sql injections
    const restaurant = await db.query(
      'select * from restaurants where id = $1',
      [req.params.restaurantId]
    );

    const reviews = await db.query(
      'select * from reviews where restaurant_id = $1',
      [req.params.restaurantId]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

// create a restaurant
restaurantRouter.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (e) {
    console.log(e.message);
  }
});

// update a restaurant
restaurantRouter.put('/:restaurantId', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id =$4 returning *',
      [
        req.body.name,
        req.body.location,
        req.body.price_range,
        req.params.restaurantId,
      ]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (e) {
    console.log(e.message);
  }
});

// delete a restaurant
restaurantRouter.delete('/:restaurantId', async (req, res) => {
  try {
    const results = await db.query('DELETE from restaurants where id = $1', [
      req.params.restaurantId,
    ]);
    res.status(204).json({
      status: 'success',
    });
  } catch (e) {
    console.log(e.message);
  }
});

// post a review
restaurantRouter.post('/:restaurantId/addReview', async (req, res) => {
  try {
    const newReview = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *',
      [req.params.restaurantId, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = restaurantRouter;
