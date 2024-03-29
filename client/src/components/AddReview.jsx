import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        rating,
        review,
      });
      console.log(response);
      history.push('/');
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              placeholder='name'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              id='rating'
              className='custom-select'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Review'>Review</label>
          <textarea
            id='Review'
            className='form-control'
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
