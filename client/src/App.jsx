import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, RestaurantDetailPage, UpdatePage } from './routes';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/restaurants/:id/update' component={UpdatePage} />
        <Route exact path='/restaurants/:id' component={RestaurantDetailPage} />
      </Router>
    </div>
  );
};

export default App;
