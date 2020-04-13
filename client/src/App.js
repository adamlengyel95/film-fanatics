import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import MovieDetails from './components/Movie/MovieDetails';
import Actors from './components/Artists/Actors/Actors';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Layout} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/movie/:id" component={MovieDetails} />
            <Route path="/actors" component={Actors} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
