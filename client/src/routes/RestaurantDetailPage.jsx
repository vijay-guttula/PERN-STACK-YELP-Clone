import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        // console.log(response.data.data);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return (
        <>
          <span className='text-warning'>0 Reviews</span>
        </>
      );
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className='text-warning ml-1'>({restaurant.count})</span>
      </>
    );
  };

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='font-weight-light display-1 text-center'>
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className='text-center'>
            {renderRating(selectedRestaurant.restaurant)}
          </div>
          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
