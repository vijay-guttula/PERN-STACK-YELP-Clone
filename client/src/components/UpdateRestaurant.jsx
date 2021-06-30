import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
  const { id } = useParams();
  let history = useHistory();
  // const { restaurants } = useContext(RestaurantsContext); not gonna use context api here as if you book mark the page, its not gonna work as this is dependant on the home page.
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data.data);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push('/');
  };

  return (
    <div>
      <h1 className='text-center'>Update restaurant</h1>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            id='name'
            type='text'
            className='form-control'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            id='location'
            type='text'
            className='form-control'
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>PriceRange</label>
          <input
            value={priceRange}
            id='price_range'
            type='number'
            className='form-control'
            placeholder='1-5'
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className='btn btn-primary'
          type='submit'
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
