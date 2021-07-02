create table reviews(
  id bigserial not null primary key,
  restaurant_id BIGINT not null references restaurants(id),
  name VARCHAR(50) not null,
  review text not null,
  rating int not null check (rating >= 1 and rating <= 5)
);

SELECT * from restaurants left join (select restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;